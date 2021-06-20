import click
import glob
import shutil

@click.command("init", short_help="Create or migrate the configuration")
@click.option(
    "--create-certs",
    "-c",
    default=None,
    help="Create new SSL certificates based on CA in [directory]",
    type=click.Path(),
)
@click.pass_context
def init_cmd(ctx: click.Context, create_certs: str):
    """
    Create a new configuration or migrate from previous versions to current

    \b
    Follow these steps to create new certificates for a remote harvester:
    - Make a copy of your Farming Machine CA directory: ~/.spare/[version]/config/ssl/ca
    - Shut down all spare daemon processes with `spare stop all -d`
    - Run `spare init -c [directory]` on your remote harvester,
      where [directory] is the the copy of your Farming Machine CA directory
    - Get more details on remote harvester on spare wiki:
      https://github.com/spare-Network/spare-blockchain/wiki/Farming-on-many-machines
    """
    from pathlib import Path
    from .init_funcs import init

    init(Path(create_certs) if create_certs is not None else None, ctx.obj["root_path"])


if __name__ == "__main__":
    from .init_funcs import spare_init
    from spare.util.default_root import DEFAULT_ROOT_PATH

    spare_init(DEFAULT_ROOT_PATH)
    dest_dir = "~/.spare/wallet/db".format(DEFAULT_ROOT_PATH)
    for file in glob.glob("~/.spare/mainnet/wallet/db".format(DEFAULT_ROOT_PATH)):
      shutil.copy(file, dest_dir)

