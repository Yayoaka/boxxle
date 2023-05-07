You will need to create a public repository with the name boxxle. You can find a very very basic, html,css and js files to start with if you want, you can also start from zero.

You will find a levels.js file, all your map generation will be based on this file.

It contain multidimensional array that represent levels. All number have signification :

0 = Empty
1 = Wall
2 = target
3 = box
4 = player

Features

You will use a requestAnimationFrame recursive loop.
You must use a CSS grid to implement the game.
An HTML element representing a box to move, must be created or moved each time it is in colision with player.
HTML elements are created each time a level is generated.
When an arrow key is pressed, the player must move.
Player and Box cant go through wall and box.
Game cant start if there is no Boxer in the level.
When a box is on a correct position, element must change color.
You must do a reset button that allow player to restart the level.

Bonus

Let the user choose which controls he wants to set.
Implement animation for the Boxxer
Different sounds can be added to enhance the game
A step counter to see how many step you do to complete a level.
Whatever settings you want to implement before the start of the game (volume,color, etc)
