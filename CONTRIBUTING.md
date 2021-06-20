# Introduction

Welcome to the spare-blockchain project!
We are happy that you are taking a look at the code for Spare, a proof of space and time cryptocurrency.

A lot of fascinating new cryptography and blockchain concepts are used and implemented here.
This repo includes the code for the Spare full node, farmer, and timelord (in spare folder), which are all written in python.

If you want to learn more about this project, read the [FAQs](https://spare.farm/faqs/)
## Contributions


We would be pleased to accept code contributions to this project.
As we have now released, the main priority is improving the mainnet blockchain.
You can visit our wiki & open issues to get a sense of what is in the backlog.
Generally, things to the left are in progress or done. Some things go through "Coming up soon", but some will come directly out of other columns.
Usually, the things closer to the top of each column are the ones that will be worked on soonest.
If you are interested in cryptography, math, or just like hacking in python, there are many interesting problems to work on.
You are welcome to contact us through Twitter.


## Run tests and linting

The first time the tests are run, BlockTools will create and persist many plots. These are used for creating
proofs of space during testing. The next time tests are run, this will not be necessary.

```bash
. ./activate
pip install ".[dev]"
black spare tests && mypy spare tests && flake8 spare tests
py.test tests -v --durations 0
```

The [black library](https://black.readthedocs.io/en/stable/) is used as an automatic style formatter to make things easier.
The [flake8 library](https://readthedocs.org/projects/flake8/) helps ensure consistent style.
The [Mypy library](https://mypy.readthedocs.io/en/stable/) is very useful for ensuring objects are of the correct type, so try to always add the type of the return value, and the type of local variables.

If you want verbose logging for tests, edit the `tests/pytest.ini` file.

## Submit changes

To propose changes, please make a pull request to the `main` branch.

To propose changes for the production releases of Spare, please make a pull request to the latest release branch.

## Copyright

By contributing to this repository, you agree to license your work under the Apache License Version 2.0, or the MIT License, or release your work to the public domain. Any work contributed where you are not the original author must contain its license header with the original author(s) and be in the public domain, or licensed under the Apache License Version 2.0 or the MIT License.
