export default function plus(...nums: number[]): number {
    // eslint-disable-next-line unicorn/no-reduce
    return nums.reduce((pre, current) => pre + current, 0);
}
