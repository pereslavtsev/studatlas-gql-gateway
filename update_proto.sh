PROTO_PATH="${PWD}/shared/packages/grabber"
OUT_DIR="${PWD}/compiled"

echo "Updating shared sources..."
git pull --recurse-submodules
git submodule update --remote --merge

if [ ! -d "$OUT_DIR" ]; then
  mkdirp "$OUT_DIR"
else
  echo "Removing old compiled files..."
  rimraf "${OUT_DIR}/*"
fi

echo "Generating JS files..."
pbjs \
    --target=static-module \
    --path="${PROTO_PATH}" \
    --out="${OUT_DIR}/compiled.js" \
    $(find "$PROTO_PATH" -type f -name "*.proto" | xargs)

echo "Generating TS files..."
pbts \
  --out="${OUT_DIR}/compiled.d.ts" \
  "${OUT_DIR}/compiled.js"

replace-in-file \
  /Promise/g \
  Observable \
  "${OUT_DIR}/compiled.d.ts" \
  --isRegex

replace-in-file \
  /\"protobufjs\"\;/g \
  "\"protobufjs\"; import { Observable } from \"rxjs\";" \
  "${OUT_DIR}/compiled.d.ts" \
  --isRegex

echo "Success"
