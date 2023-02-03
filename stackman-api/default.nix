{ lib, rustPlatform }:

rustPlatform.buildRustPackage {
  pname = "stackman-api-demo";
  version = "0.1.0";

  src = ./.;

  cargoLock.lockFile = ./Cargo.lock;

  meta = {
    description = "API server for the Stackman interface";
    homepage = "https://github.com/wuvt/stackman";
    license = lib.licenses.agpl3Plus;
    platforms = lib.platforms.linux;
  };
}
