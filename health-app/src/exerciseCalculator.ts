interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

interface CalculateExerciseValues {
    [index: number]: number
}

const parseExerciseArguments = (args: Array<string>): CalculateExerciseValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    if (args.length > 4) throw new Error('too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
    {
        const valueArray: CalculateExerciseValues = [Number(args[2]), Number(args[3])]
        ;
        return valueArray;
    } else {
        throw new Error('provided values were not numbers');
    }
}

const calculateExercise = (values: CalculateExerciseValues): string => {
    const size: number = values[1] * values[1] / 10000
    const result: number = Math.floor(values[0] / size)
    switch (true) {
        case values[0] <= 0 || values[1] <= 0:
            throw new Error('invalid arguments')
        case result < 18:
            return 'Underweight (unhealthy weigth)'
        case result < 25 && result >= 18:
            return 'Normal (healthy weight)'
        case result >= 25 && result < 30:
            return 'Overweight (unhealthy weight)'
        case result >= 30:
            return 'Obese (very unhealthy weight)'
        default:
            throw new Error(':(')
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

