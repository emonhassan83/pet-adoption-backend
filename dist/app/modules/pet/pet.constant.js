"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petFilterableFields = exports.petSearchAbleFields = void 0;
exports.petSearchAbleFields = ['species', 'breed', 'location']; //* only for search term
exports.petFilterableFields = [
    'species', 'breed', 'location', 'age', 'size',
    'searchTerm'
]; //* for all filtering 
