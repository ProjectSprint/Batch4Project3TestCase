gen-test-ai-context:
	find test \
		! -name "*.jpg" \
		-type f \
		-exec sh -c 'echo "=== File: $$1 ==="; cat "$$1"' sh {} \; \
		> .context 2>&1

