console.log('hello typescript')

type Operation = 'multiply' | 'add' | 'divide';

interface CalculateValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
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
}

const calculator = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case 'add':
            return a + b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) throw new Error('can\'t divide by 0');
            return a / b;
        default:
            throw new Error('operation is not multiply, add or divide')
    }
}
try {
    console.log('processed')
} catch (error) {
    console.log('something went wrong:', error.message);
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    const op: Operation = 'add';
    console.log(calculator(value1, value2, op));
} catch (error) {
    console.log('Something went wrong:', error.message);
}

