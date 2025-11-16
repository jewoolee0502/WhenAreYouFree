import mongoose, { Schema, Document } from 'mongoose';

// Interface for TimeBlock subdocument
interface ITimeBlock {
  date: Date;
  hour: number;
  halfHour: boolean;
}

// Interface for Availability subdocument
interface IAvailability {
  participantName: string;
  responded: boolean;
  lastUpdated: Date;
  timeBlocks: ITimeBlock[];
}

// Interface for Session document
export interface ISession extends Document {
  title: string;
  possibleDates: Date[];
  hourRange: {
    start: number;
    end: number;
  };
  timeBlockUnit: 'hour' | 'half-hour';
  availabilities: IAvailability[];
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  findParticipant(participantName: string): IAvailability | undefined;
  upsertAvailability(participantName: string, timeBlocks: ITimeBlock[]): ISession;
}

// Subdocument schema for time blocks
const TimeBlockSchema = new Schema<ITimeBlock>({
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  halfHour: {
    type: Boolean,
    default: false
  }
}, { _id: false });

// Subdocument schema for participant availability
const AvailabilitySchema = new Schema<IAvailability>({
  participantName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  responded: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  timeBlocks: [TimeBlockSchema]
}, { _id: false });

// Main Session schema
const SessionSchema = new Schema<ISession>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  possibleDates: {
    type: [Date],
    required: true,
    validate: {
      validator: function(dates: Date[]) {
        return dates.length > 0 && dates.length <= 14;
      },
      message: 'Must have between 1 and 14 possible dates'
    }
  },
  hourRange: {
    start: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    },
    end: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
      validate: {
        validator: function(this: ISession, value: number) {
          return value > this.hourRange.start;
        },
        message: 'End hour must be greater than start hour'
      }
    }
  },
  timeBlockUnit: {
    type: String,
    enum: ['hour', 'half-hour'],
    required: true,
    default: 'hour'
  },
  availabilities: {
    type: [AvailabilitySchema],
    validate: {
      validator: function(availabilities: IAvailability[]) {
        return availabilities.length <= 50;
      },
      message: 'Maximum 50 participants allowed'
    },
    default: []
  },
  expirationDate: {
    type: Date,
    required: true,
    index: { expires: 0 }  // TTL index - MongoDB auto-deletes when expiration is reached
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Method to check if a participant already exists
SessionSchema.methods.findParticipant = function(participantName: string): IAvailability | undefined {
  return this.availabilities.find(
    (avail: IAvailability) => avail.participantName.toLowerCase() === participantName.toLowerCase()
  );
};

// Method to upsert participant availability
SessionSchema.methods.upsertAvailability = function(participantName: string, timeBlocks: ITimeBlock[]): ISession {
  const existingIndex = this.availabilities.findIndex(
    (avail: IAvailability) => avail.participantName.toLowerCase() === participantName.toLowerCase()
  );

  const newAvailability: IAvailability = {
    participantName,
    responded: true,
    lastUpdated: new Date(),
    timeBlocks
  };

  if (existingIndex !== -1) {
    // Update existing participant
    this.availabilities[existingIndex] = newAvailability;
  } else {
    // Add new participant
    if (this.availabilities.length >= 50) {
      throw new Error('Maximum participant limit (50) reached');
    }
    this.availabilities.push(newAvailability);
  }

  return this;
};

const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
