from dataclasses import dataclass

from spare.types.blockchain_format.sized_bytes import bytes32
from spare.util.ints import uint32
from spare.util.streamable import Streamable, streamable


@dataclass(frozen=True)
@streamable
class PoolTarget(Streamable):
    puzzle_hash: bytes32
    max_height: uint32  # A max height of 0 means it is valid forever
