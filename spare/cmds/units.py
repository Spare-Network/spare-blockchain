from typing import Dict

# The rest of the codebase uses gravitons everywhere. Only uses these units
# for user facing interfaces
units: Dict[str, int] = {
    "spare": 10 ** 12,  # 1 spare (SPARE) is 1,000,000,000,000 graviton (1 Trillion)
    "graviton:": 1,
    "colouredcoin": 10 ** 3,  # 1 coloured coin is 1000 colouredcoin gravitons
}
