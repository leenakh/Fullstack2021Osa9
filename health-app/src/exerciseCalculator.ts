type Feedback = 'Well done!' | 'Not too bad.' | 'You can do better than this.'

interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: Feedback;
    target: number;
    average: number
}

interface CalculateExerciseValues {
    [index: number]: number
}

const parseExerciseArguments = (args: Array<string>): CalculateExerciseValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    {
        let values: Array<number> = []
        let i = 2
        for (i = 2; i < args.length; i++) {
            let v = Number(args[i])
            if (!isNaN(v)) {
                values = values.concat(v)
            }
            else throw new Error('provided value is not a number')
        }
        const valueArray: CalculateExerciseValues = values;
        return valueArray;
    }
}

const isNotZero = (value: number) => {
    return value > 0
}

const averageTrainingTime = (hours: Array<number>, days: number): number => {
    let i = 0;
    let sum = 0;
    for (i = 0; i < hours.length; i++) {
        sum += hours[i]
    }
    return sum / days
}

const calculateRating = (average: number): number => {
    switch (true) {
        case average < 1:
            return 1
        case average < 2 && average > 1:
            return 2
        case average > 2:
            return 3
        default:
            throw new Error('invalid argument')
    }
}

const determineSuccess = (rating: number, target: number): boolean => {
    switch(true) {
        case rating < target:
            return false
        case rating >= target:
            return true
        default:
            throw new Error('invalid arguments')
    }
}

const ratingFeedback = (rating: number): Feedback => {
    switch (rating) {
        case 1:
            return 'You can do better than this.'
        case 2:
            return 'Not too bad.'
        case 3:
            return 'Well done!'
        default:
            throw new Error('invalid argument')
    }
}

const calculateExercise = (values: CalculateExerciseValues): ResultObject => {
    const valuesArray: Array<number> = Array.prototype.slice.call(values);
    const target: number = valuesArray.shift();
    const periodLength: number = valuesArray.length;
    let trainingDaysArray: Array<number> = Array.prototype.slice.call(valuesArray).filter(isNotZero);
    const trainingDays: number = trainingDaysArray.length;
    const average: number = averageTrainingTime(trainingDaysArray, periodLength);
    const rating: number = calculateRating(average)
    const ratingDescription: Feedback = ratingFeedback(rating);
    const success: boolean = determineSuccess(rating, target)
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

}
try {
    console.log('processed')
} catch (error) {
    console.log('something went wrong:', error.message);
}

try {
    const parsed = parseExerciseArguments(process.argv);
    console.log(calculateExercise(parsed));
} catch (error) {
    console.log('Something went wrong:', error.message);
}

