import { Injectable } from '@nestjs/common';

@Injectable()
export class MassProcessor {
    ODD = 'odd';
    OVER_UNDER = 'over_under';
    OVER = 'over';
    UNDER = 'under';
    FAVORITE = 'favorite';
    UNDERDOG = 'underdog';

    WIN_FULL = 'WIN FULL';
    LOSE_FULL = 'LOSE FULL';
    WIN_A_HALF = 'WIN A HALF';
    LOSE_A_HALF = 'LOSE A HALF';
    DRAW = 'this.DRAW';
    UNDEFINED = 'this.UNDEFINED';
    /**
     * build eav bot value
     */
    processMatchResult(betInMatch, homeResult, awayResult, homePosition, awayPosition, odd, overUnder)
    {
        homeResult = parseFloat(homeResult);
        awayResult = parseFloat(awayResult);
        overUnder = parseFloat(overUnder);
        odd = parseFloat(odd);
        homePosition = parseFloat(homePosition);
        awayPosition = parseFloat(awayPosition);
        let absOdd = Math.abs(odd);
        let total = homeResult + awayResult;

        if (betInMatch === this.OVER) {
            if (total > overUnder) {
                if (total - overUnder > 0.25) {
                    return this.WIN_FULL;
                } else {
                    return this.WIN_A_HALF;
                }
            } else if (total === overUnder) {
                return this.DRAW;
            } else {
                if (overUnder - total > 0.25) {
                    return this.LOSE_FULL;
                } else {
                    return this.LOSE_A_HALF;
                }
            }
        } else if (betInMatch === this.UNDER) {
            if (total > overUnder) {
                if (total - overUnder > 0.25) {
                    return this.LOSE_FULL;
                } else {
                    return this.LOSE_A_HALF;
                }
            } else if (total === overUnder) {
                return this.DRAW;
            } else {
                if (overUnder - total > 0.25) {
                    return this.WIN_FULL;
                } else {
                    return this.WIN_A_HALF;
                }
            }
        } else if (betInMatch === this.FAVORITE) {
            if (odd === 0) {
                if (homePosition > awayPosition && homeResult > awayResult) {
                    return this.LOSE_FULL;
                } else if (homePosition > awayPosition && homeResult < awayResult) {
                    return this.WIN_FULL;
                } else if (homePosition < awayPosition && homeResult < awayResult) {
                    return this.LOSE_FULL;
                } else if (homePosition < awayPosition && homeResult > awayResult) {
                    return this.WIN_FULL;
                } else if ((homePosition > awayPosition || homePosition < awayPosition) && homeResult === awayResult) {
                    return this.DRAW;
                } else {
                    return this.UNDEFINED;
                }
            } else if (odd < 0) {
                if (homeResult < awayResult) {
                    if (awayResult - homeResult - absOdd === 0.25) {
                        return this.WIN_A_HALF;
                    } else if (awayResult - homeResult - absOdd > 0.25) {
                        return this.WIN_FULL;
                    } else if (awayResult - homeResult - absOdd === 0) {
                        return this.DRAW;
                    } else if (awayResult - homeResult - absOdd === -0.25) {
                        return this.LOSE_A_HALF;
                    } else {
                        return this.LOSE_FULL;
                    }
                } else if (homeResult === awayResult) {
                    if (odd === -0.25) {
                        return this.LOSE_A_HALF;
                    } else {
                        return this.LOSE_FULL;
                    }
                } else {
                    return this.LOSE_FULL;
                }
            } else {
                if (homeResult > awayResult) {
                    if (homeResult - awayResult - absOdd === 0.25) {
                        return this.WIN_A_HALF;
                    } else if (homeResult - awayResult - absOdd > 0.25) {
                        return this.WIN_FULL;
                    } else if (homeResult - awayResult - absOdd === 0) {
                        return this.DRAW;
                    } else if (homeResult - awayResult - absOdd === -0.25) {
                        return this.LOSE_A_HALF;
                    } else {
                        return this.LOSE_FULL;
                    }
                } else if (homeResult === awayResult) {
                    if (odd === 0.25) {
                        return this.LOSE_A_HALF;
                    } else {
                        return this.LOSE_FULL;
                    }
                } else {
                    return this.LOSE_FULL;
                }
            }
        } else if (betInMatch === this.UNDERDOG) {
            if (odd === 0) {
                if (homePosition > awayPosition && homeResult > awayResult) {
                    return this.WIN_FULL;
                } else if (homePosition > awayPosition && homeResult < awayResult) {
                    return this.LOSE_FULL;
                } else if (homePosition < awayPosition && homeResult < awayResult) {
                    return this.WIN_FULL;
                } else if (homePosition < awayPosition && homeResult > awayResult) {
                    return this.LOSE_FULL;
                } else if ((homePosition > awayPosition || homePosition < awayPosition) && homeResult === awayResult) {
                    return this.DRAW;
                } else {
                    return this.UNDEFINED;
                }
            } else if (odd < 0) {
                if (homeResult < awayResult) {
                    if (awayResult - homeResult - absOdd === 0.25) {
                        return this.LOSE_A_HALF;
                    } else if (awayResult - homeResult - absOdd > 0.25) {
                        return this.LOSE_FULL;
                    } else if (awayResult - homeResult - absOdd === 0) {
                        return this.DRAW;
                    } else if (awayResult - homeResult - absOdd === -0.25) {
                        return this.WIN_A_HALF;
                    } else {
                        return this.WIN_FULL;
                    }
                } else if (homeResult === awayResult) {
                    if (odd === -0.25) {
                        return this.WIN_A_HALF;
                    } else {
                        return this.WIN_FULL;
                    }
                } else {
                    return this.WIN_FULL;
                }
            } else {
                if (homeResult > awayResult) {
                    if (homeResult - awayResult - absOdd === 0.25) {
                        return this.LOSE_A_HALF;
                    } else if (homeResult - awayResult - absOdd > 0.25) {
                        return this.LOSE_FULL;
                    } else if (homeResult - awayResult - absOdd === 0) {
                        return this.DRAW;
                    } else if (homeResult - awayResult - absOdd === -0.25) {
                        return this.WIN_A_HALF;
                    } else {
                        return this.WIN_FULL;
                    }
                } else if (homeResult === awayResult) {
                    if (odd === 0.25) {
                        return this.WIN_A_HALF;
                    } else {
                        return this.WIN_FULL;
                    }
                } else {
                    return this.WIN_FULL;
                }
            }
        }


        return this.UNDEFINED;
    }
}