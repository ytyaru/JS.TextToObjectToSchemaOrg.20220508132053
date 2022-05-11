class Duration {
    #numbers = "\\d+";
    #fractionalNumbers = "".concat(this.#numbers, "(?:[\\.,]").concat(this.#numbers, ")?");
    #datePattern = "(".concat(this.#numbers, "Y)?(").concat(this.#numbers, "M)?(").concat(this.#numbers, "W)?(").concat(this.#numbers, "D)?");
    #timePattern = "T(".concat(this.#fractionalNumbers, "H)?(").concat(this.#fractionalNumbers, "M)?(").concat(this.#fractionalNumbers, "S)?");
    #iso8601 = "P(?:".concat(this.#datePattern, "(?:").concat(this.#timePattern, ")?)");
    #objMap = [
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
    ];
    #defaultDuration = Object.freeze({
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    #pattern = new RegExp(this.#iso8601);
    constructor() {}
    parse(durationString) {
        var matches = durationString.replace(/,/g, ".").match(this.#pattern);
        if (!matches) {
            throw new RangeError("invalid duration: ".concat(durationString));
        }
        // Slice away first entry in match-array (the input string)
        var slicedMatches = matches.slice(1);
        if (slicedMatches.filter(function (v) { return v != null; }).length === 0) {
            throw new RangeError("invalid duration: ".concat(durationString));
        }
        // Check only one fraction is used
        if (slicedMatches.filter(function (v) { return /\./.test(v || ""); }).length > 1) {
            throw new RangeError("only the smallest unit can be fractional");
        }
        const objMap = this.#objMap
        return slicedMatches.reduce(function (prev, next, idx) {
            prev[objMap[idx]] = parseFloat(next || "0") || 0;
            return prev;
        }, {});
    }
    end(durationInput, startDate) {
        if (startDate === void 0) { startDate = new Date(); }
        var duration = Object.assign({}, defaultDuration, durationInput);
        var timestamp = startDate.getTime();
        var then = new Date(timestamp);
        then.setFullYear(then.getFullYear() + duration.years);
        then.setMonth(then.getMonth() + duration.months);
        then.setDate(then.getDate() + duration.days);
        var hoursInMs = duration.hours * 3600 * 1000;
        var minutesInMs = duration.minutes * 60 * 1000;
        then.setMilliseconds(then.getMilliseconds() + duration.seconds * 1000 + hoursInMs + minutesInMs);
        then.setDate(then.getDate() + duration.weeks * 7);
        return then;
    }
    toSeconds(durationInput, startDate) {
        if (startDate === void 0) { startDate = new Date(); }
        var duration = Object.assign({}, defaultDuration, durationInput);
        var timestamp = startDate.getTime();
        var now = new Date(timestamp);
        var then = (0, exports.end)(duration, now);
        var seconds = (then.getTime() - now.getTime()) / 1000;
        return seconds;
    }
}

