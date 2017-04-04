### CLI utilite. Parser for creating dictionary, JSON formatted.

Forexample:

input: 72 make [meIk] v- (made [meId]; made) делать, производить; совершать 59.124

output: {
        "id": 72,
        "en": "make",
        "sound": "[meIk]",
        "ru": {
            "v-": "делать, производить; совершать"
        },
        "irregular": "made [meId]; made"
    }

Run: node main.js