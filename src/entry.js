import { readLevelDb } from 'mcbe-leveldb-reader';
import { analyzeWorld, zh } from './world.js';
window.MCBE = { readLevelDb, analyzeWorld, zh };
import './main.js';

import { installI18n } from './i18n.js';
import { installTheme } from './theme.js';
installI18n();
installTheme();
