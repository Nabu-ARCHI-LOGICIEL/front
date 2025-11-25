import { Coords, Seat } from "@/types/interfaces";
import { ETool } from "@/types/enums";

export function drawSeats(
	ctx: CanvasRenderingContext2D,
	seats: Map<string, Seat>,
	cellSize: number,
	cursorGridCoords: Coords,
	selectedTool: ETool,
	offset: Coords,
	seatImg: HTMLImageElement,
) {
	for (const [, seat] of seats) {
		let opacity = 1;
		if (
			seat.coords.x === cursorGridCoords.x &&
			seat.coords.y === cursorGridCoords.y &&
			selectedTool === ETool.Delete
		) {
			opacity = 0.4;
		}

		drawSeat(ctx, seat, cellSize, opacity, offset, seatImg);
	}
}

export function drawSeat(
	ctx: CanvasRenderingContext2D,
	seat: Seat,
	cellSize: number,
	opacity: number = 1,
	offset: Coords,
	seatImg: HTMLImageElement,
) {
	const angle = (seat.rotation * Math.PI) / 180;

	ctx.save();
	ctx.globalAlpha = opacity;
	ctx.translate(
		seat.coords.x * cellSize + cellSize / 2 + offset.x,
		seat.coords.y * cellSize + cellSize / 2 + offset.y,
	);
	ctx.rotate(angle);
	ctx.drawImage(seatImg, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
	ctx.restore();
}
