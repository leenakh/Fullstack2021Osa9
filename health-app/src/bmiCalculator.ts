type Message = 'Underweight (unhealthy weigth)' | 'Normal (healthy weight)' | 'Overweight (unhealthy weight)' | 'Obese (very unhealthy weight)';

/* interface CalculateValues {
    value1: number;
    value2: number;
} */

/* const parseArguments = (args: Array<string>): CalculateValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    if (args.length > 4) throw new Error('too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('provided values were not numbers');
    }
} */

const calculateBmi = (weight: number, height: number): Message => {
    const size: number = height * height / 10000;
    const result: number = Math.floor(weight / size);
    switch (true) {
        case height <= 0 || weight <= 0:
            throw new Error('invalid arguments');
        case result < 18:
            return 'Underweight (unhealthy weigth)';
        case result < 25 && result >= 18:
            return 'Normal (healthy weight)';
        case result >= 25 && result < 30:
            return 'Overweight (unhealthy weight)';
        case result >= 30:
            return 'Obese (very unhealthy weight)';
        default:
            throw new Error('malformatted parameters');
    }
};
/* try {
    console.log('processed')
} catch (error) {
    console.log('something went wrong:', error.message);
} */

/* try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error) {
    console.log('Something went wrong:', error.message);
} */

export default calculateBmi;

