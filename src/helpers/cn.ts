export function cn(...args: Array<string | undefined>) {
	return args.filter(arg => arg).join(' ');
}
