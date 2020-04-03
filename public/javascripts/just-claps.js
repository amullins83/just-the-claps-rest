/*
  Copyright 2017 Austin Mullins
  This file is part of Just-the-Claps.

  Just-the-Claps is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Just-the-Claps is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Just-the-Claps.  If not, see <http://www.gnu.org/licenses/>.
*/

const HANDS = String.fromCodePoint(0x1f44f);
var justClapsTransform = function(text, symbol) {
  if (!text)
    return "";

  if (!symbol)
    symbol = HANDS;

  return text.toUpperCase().replace(/[\b\s\.\,]+/g, symbol);
};


if (typeof module != "undefined" && module) {
  module.exports = justClapsTransform;
}

// Poor man's isomorphic Javascript
if (typeof document != "undefined" && document) {
  var textArea = document.getElementById("text");
  var symbolText = document.getElementById("symbol");
  var result = document.getElementById("result");
  var copyButton = document.getElementById("copy-button");
  var didCopySpan = document.getElementById("did-copy");
  var oldCopy = document.oncopy;

  if (textArea && result) {
    textArea.addEventListener("input", updateResult);
    if (symbolText)
      symbolText.addEventListener("input", updateResult);
  }

  if (copyButton) {
    copyButton.onclick = function() {
      document.oncopy = copyHandler;
      document.execCommand('copy');
    };
  }

  function copyHandler(e) {
    e.clipboardData.setData("text/plain", result.innerText);
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

  function updateResult() {
    var symbol = symbolText ? symbolText.value : HANDS;
    result.innerHTML = justClapsTransform(textArea.value, symbol);
  }

  const SYMBOLS = ["👏", "🧼", "🌈", "🦠", "😷", "🤮", "🌹", "🧻", "💗"];
  var symbolElements = [];
  function makeSymbolElement(symbol) {
    var el = document.createElement("a");
    el.className = "symbol-btn";
    el.innerText = symbol;
    el.attributes["data-symbol"] = symbol;
    el.attributes["href"] = "#";
    el.onclick = symbolClick;
    return el;
  }

  var collection = document.getElementById("symbol-collection");
  SYMBOLS.forEach(function(symbol) {
    var el = makeSymbolElement(symbol);
    symbolElements.push(el);
    collection.appendChild(el);
  });

  function symbolClick(e) {
    updateSymbolClasses(this);
    var symbol = this.attributes["data-symbol"];
    if (symbol && symbolText) {
      symbolText.value = symbol;
    }
    updateResult();
  }

  function updateSymbolClasses(selectedSymbol) {
    symbolElements.forEach(function(el) {
      if (el == selectedSymbol) {
        el.className = "symbol-btn symbol-btn--selected";
      } else {
        el.className = "symbol-btn";
      }
    });
  }
}
