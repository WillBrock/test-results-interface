export default function formatDuration(seconds) {
	seconds = Number(seconds);

	const hours   = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds % 3600 / 60);
	seconds       = Math.floor(seconds % 3600 % 60);

	const hour_display   = hours > 0 ? `${hours}h ` : ``;
	const minute_display = minutes > 0 ? `${minutes}m ` : ``;
	const second_display = seconds > 0 ? `${seconds}s` : ``;

	return hour_display + minute_display + second_display;
}
