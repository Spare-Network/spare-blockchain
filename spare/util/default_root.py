import os
from pathlib import Path

DEFAULT_ROOT_PATH = Path(os.path.expanduser(os.getenv("SPARE_ROOT", "~/.spare-blockchain/mainnet"))).resolve()
