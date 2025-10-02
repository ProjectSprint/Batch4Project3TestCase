gen-ai-context:
	find . \
		! -path "./node_modules/*" \
		! -name "package*" \
		! -name "makefile" \
		! -name ".*" \
		! -path "./.git/*" \
		! -name "*.jpg" \
		-type f \
		-exec sh -c 'echo "=== File: $$1 ==="; cat "$$1"' sh {} \; \
		> .context 2>&1

