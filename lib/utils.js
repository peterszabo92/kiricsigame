/**
 * Created by Péter on 2016. 08. 24..
 */
var utils = {
    norm: function (value, min, max) {
        return (value - min) / (max - min);
    },
    lerp: function (norm, min, max) {
        return (max - min) * norm + min;
    },
    map: function (value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },
	randomRangeInt: function(min, max) {
		return Math.floor(min + Math.random() * (max - min));
	},
	componentToHex: function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	},
	rgbToHex: function(r, g, b) {
		return "#" + utils.componentToHex(r) + utils.componentToHex(g) + utils.componentToHex(b);
	},
    roundNearest: function(value, nearest) {
        return Math.round(value/nearest)*nearest;
    }
};