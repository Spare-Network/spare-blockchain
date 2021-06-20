from typing import KeysView, Generator

SERVICES_FOR_GROUP = {
    "all": "spare_harvester spare_timelord_launcher spare_timelord spare_farmer spare_full_node spare_wallet".split(),
    "node": "spare_full_node".split(),
    "harvester": "spare_harvester".split(),
    "farmer": "spare_harvester spare_farmer spare_full_node spare_wallet".split(),
    "farmer-no-wallet": "spare_harvester spare_farmer spare_full_node".split(),
    "farmer-only": "spare_farmer".split(),
    "timelord": "spare_timelord_launcher spare_timelord spare_full_node".split(),
    "timelord-only": "spare_timelord".split(),
    "timelord-launcher-only": "spare_timelord_launcher".split(),
    "wallet": "spare_wallet spare_full_node".split(),
    "wallet-only": "spare_wallet".split(),
    "introducer": "spare_introducer".split(),
    "simulator": "spare_full_node_simulator".split(),
}


def all_groups() -> KeysView[str]:
    return SERVICES_FOR_GROUP.keys()


def services_for_groups(groups) -> Generator[str, None, None]:
    for group in groups:
        for service in SERVICES_FOR_GROUP[group]:
            yield service


def validate_service(service: str) -> bool:
    return any(service in _ for _ in SERVICES_FOR_GROUP.values())
