module.exports = {
    rootDir: "",
    collectCoverageFrom: [
        "<rootDir>/src/*.{js,vue,ts}",
    ],
    testMatch: [
        "<rootDir>/**/*.(test|spec).js"
    ],
    coverageDirectory:  "<rootDir>/public/coverage/js",
    collectCoverage: true, // kann optional einstellen
};
