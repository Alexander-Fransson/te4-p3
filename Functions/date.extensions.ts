interface Date {
    getWeek(): number;
}

Date.prototype.getWeek = function() {
    const onejan = (new Date(this.getFullYear(), 0, 1));
    return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}

const weekNumber = (new Date()).getWeek();


