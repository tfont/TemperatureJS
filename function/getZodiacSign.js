//Date.prototype.getZodiacSign = function()
function getZodiacSign()
{
    var _this = new Date;
    var zodiaque = new Array("aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"),
        d, w, m;
    d = (367 * _this.getFullYear() - Math.floor((7 * (_this.getFullYear() + Math.floor((_this.getMonth() + 1 + 9) / 12))) / 4) + Math.floor((275 * (_this.getMonth() + 1)) / 9) + _this.getDate() - 730530);
    w = (282.9404 + 4.70935E-5 * d) - Math.floor((282.9404 + 4.70935E-5 * d) / 360.0) * 360.0;
    m = (356.0470 + 0.9856002585 * d) - Math.floor((356.0470 + 0.9856002585 * d) / 360.0) * 360.0
    
    return zodiaque[Math.floor(((w + m) - Math.floor((w + m) / 360.0) * 360.0) / 30.0)];
};