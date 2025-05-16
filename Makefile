# SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
# SPDX-License-Identifier: MIT

.PHONY: all test lint it tsc clean npx
.ONESHELL:
.SHELLFLAGS := -e -o pipefail -c
.SECONDARY:
SHELL := bash
TSS=$(shell find . -not -path './node_modules/**' -not -path './test/**' -name '*.ts')

all: test lint it npx tsc

lint:
	npx -y eslint . --config eslint.config.mjs

test:
	npx -y jest --config jest.config.ts --no-color --ci

it:
	mkdir -p temp
	npx -y @modelcontextprotocol/inspector \
		--config test/fixtures/claude-code-config.json \
		--server aibolit \
		--cli --method tools/list

npx:
	npx . --version
	npx . --help

tsc: $(TSS)
	npx -y tsc --target es2020 --module nodenext --outDir dist $(TSS)
