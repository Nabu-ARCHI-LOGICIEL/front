import { drawSeat } from "@/draw/seat";
import { Seat, Tool, Coords } from "@/types/interfaces";
import { ETool } from "@/types/enums";

export function drawPreview(
	ctx: CanvasRenderingContext2D,
	cursorGridCoords: Coords,
	cellSize: number,
	rotation: number,
	tool: Tool,
	seats: Map<string, Seat>,
	offset: Coords,
	seatImg: HTMLImageElement,
	deleteImg: HTMLImageElement,
) {
	const x = cursorGridCoords.x * cellSize + offset.x;
	const y = cursorGridCoords.y * cellSize + offset.y;

	const stringPosition = `${cursorGridCoords.x}-${cursorGridCoords.y}`;

	switch (tool.name) {
		case ETool.Delete: {
			const seat = seats.get(stringPosition);
			if (!seat) return;

			ctx.drawImage(deleteImg, x, y, cellSize, cellSize);
			break;
		}

		case ETool.Add: {
			if (seats.get(stringPosition)) return;

			const previewSeat: Seat = {
				coords: { x: cursorGridCoords.x, y: cursorGridCoords.y },
				rotation,
			};

			drawSeat(ctx, previewSeat, cellSize, 0.4, offset, seatImg);
			break;
		}

		default:
			break;
	}
}
