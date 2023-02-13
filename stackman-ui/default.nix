{ lib, buildNpmPackage }:

let
  pname = "stackman-ui";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = "sha256-PwYJgBHrze+n9vBRs/EFGQLyQrfoOmL/51k4H2W1ZIo=";

  meta = {
    description = "Web interface for browsing and playing from Stackman";
    homepage = "https://github.com/wuvt/stackman";
    license = lib.licenses.agpl3Plus;
    platforms = lib.platforms.linux;
  };

in {
  stackman-ui = buildNpmPackage {
    inherit pname version src npmDepsHash meta;

    installPhase = ''
      mkdir -p "$out"
      cp -r dist/* "$out"
    '';
  };

  stackman-ui-prettier = buildNpmPackage {
    pname = "${pname}-prettier";
    inherit version src npmDepsHash;

    buildPhase = "npx prettier --check .";

    meta = meta // { description = "Check Prettier formatting"; };
  };

  stackman-ui-typescript = buildNpmPackage {
    pname = "${pname}-typescript";
    inherit version src npmDepsHash;

    buildPhase = "npx tsc --noEmit";

    meta = meta // { description = "Check TypeScript compilation"; };
  };
}
