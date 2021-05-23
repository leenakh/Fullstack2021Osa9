type Feedback = 'Excellent!' | 'Well done!' | 'You can do better than that.';

interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: Feedback;
    target: number;
    average: number
}

export interface RequestObject {
    daily_exercises: Array<number>;
    target: number
}

export interface CalculateExerciseValues {
    [index: number]: number
}

export const parseExerciseArguments = (args: Array<string>): CalculateExerciseValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    {
        let values: Array<number> = [];
        let i = 2;
        for (i = 2; i < args.length; i++) {
            const v = Number(args[i]);
            if (!isNaN(v) && v >= 0) {
                values = values.concat(v);
            }
            else throw new Error('provided value is invalid');
        }
        const valueArray: CalculateExerciseValues = values;
        return valueArray;
    }
};

const isNotZero = (value: number) => {
    return value > 0;
};

const averageTrainingTime = (hours: Array<number>, days: number): number => {
    let i = 0;
    let sum = 0;
    for (i = 0; i < hours.length; i++) {
        sum += hours[i];
    }
    return sum / days;
};

const calculateRating = (average: number, target: number): number => {
    switch (true) {
        case average < target * 0.9:
            return 1;
        case average >= target * 0.9 && average < target * 1.2:
            return 2;
        case average >= target * 1.2:
            return 3;
        default:
            throw new Error('invalid arguments');
    }
};

const determineSuccess = (rating: number): boolean => {
    switch(true) {
        case rating < 2:
            return false;
        case rating >= 2:
            return true;
        default:
            throw new Error('invalid arguments');
    }
};

const ratingFeedback = (rating: number): Feedback => {
    switch (rating) {
        case 1:
            return 'You can do better than that.';
        case 2:
            return 'Well done!';
        case 3:
            return 'Excellent!';
        default:
            throw new Error('invalid argument');
    }
};

const calculateExercise = (values: RequestObject): ResultObject => {
    const target: number = values.target;
    const periodLength: number = values.daily_exercises.length;
    const trainingDaysArray: Array<number> = values.daily_exercises.filter(isNotZero);
    const trainingDays: number = trainingDaysArray.length;
    const average: number = averageTrainingTime(trainingDaysArray, periodLength);
    const rating: number = calculateRating(average, target);
    const ratingDescription: Feedback = ratingFeedback(rating);
    const success: boolean = determineSuccess(rating);
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

/* try {
    const parsed = parseExerciseArguments(process.argv);
    console.log(calculateExercise(parsed));
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Something went wrong:', error.message);
} */

export default calculateExercise;
