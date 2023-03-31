import incrementActivePlayer from "./incrementActivePlayer";
import Player from "../classes/Player";
import { describe, expect, test } from '@jest/globals';

const players: Player[] = [new Player("bob"), new Player("chris"), new Player('gina')]

test('Increment works through array', () => {
  expect(incrementActivePlayer(players, 1)).toBe(2);
});

test('Increment works from lasta array index to zero', () => {
  expect(incrementActivePlayer(players, 2)).toBe(0);
});