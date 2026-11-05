# Backend Agent Instructions

Inspect the verified model card before implementing inference.
Match model input shape, normalization, and class ordering.
Validate file type, size, decoding, and malformed inputs.
Return defined API schemas and explicit error responses.
Avoid exposing sensitive internal filesystem paths.
Write tests for loading, prediction, and invalid requests.
Never claim API readiness without executed tests.
Do not create placeholder endpoints that misrepresent status.
