import type { CssClassMap } from '../css/core.js';
import type { CssMap } from '../map/index.js';

export interface Emitter {
  emit(map: CssMap, classMaps: Map<string, CssClassMap[]>): Promise<void>;
}
