/*
  Copyright 2017 Austin Mullins
  This file is part of Just-the-Claps.

  Just-the-Claps is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Just-the-Clpas is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Just-the-Claps.  If not, see <http://www.gnu.org/licenses/>.
*/

const HANDS = String.fromCodePoint(0x1f44f);
var textArea = document.getElementById("text");
var result = document.getElementById("result");
var copyButton = document.getElementById("copy-button");
var didCopySpan = document.getElementById("did-copy");
var oldCopy = document.oncopy;
var handsText = "";

textArea.addEventListener("input", function() {
  handsText = textArea.value.toUpperCase().replace(/[\b\s\.\,]+/g, HANDS);
  result.innerHTML = handsText;
});

function copyHandler(e) {
  e.clipboardData.setData("text/plain", handsText);
  e.preventDefault();
  document.oncopy = oldCopy;

  didCopySpan.style.display = 'inline';
  didCopySpan.style.opacity = 1.0;
  setTimeout(function() {
    didCopySpan.style.opacity = 0.0;
    setTimeout(function() {
      didCopySpan.style.display = 'none';
    }, 500);
  }, 500);
}

copyButton.onclick = function() {
  document.oncopy = copyHandler;
  document.execCommand('copy');
};
