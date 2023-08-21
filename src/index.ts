'use strict';

import 'reflect-metadata';
import MarketStatsApplication from 'main/MarketStatsApplication';

global['app-name'] = "marker_stats";

export default new MarketStatsApplication().init();