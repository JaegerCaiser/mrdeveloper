# [1.1.0](https://github.com/JaegerCaiser/mrdeveloper/compare/v1.0.3...v1.1.0) (2025-11-03)


### Bug Fixes

* add contents write permission to delete merged branches workflow ([57f2e07](https://github.com/JaegerCaiser/mrdeveloper/commit/57f2e07d00dfd93d5f8aaa39a753ce9380560d69))
* add pnpm setup step to develop workflow ([e7d2efb](https://github.com/JaegerCaiser/mrdeveloper/commit/e7d2efb35d382983e02170246a54692c6d88622d))
* adiciona dependências de teste nos jobs de deploy ([f897087](https://github.com/JaegerCaiser/mrdeveloper/commit/f89708776fe506d61cea3e537c3f0a7504ee7c16))
* **animated-background:** hoist computeConfig, ensure resize uses CSS pixels and fix init order ([7de9b14](https://github.com/JaegerCaiser/mrdeveloper/commit/7de9b147d9c719dbc7085089008a6a0fc2c7ae65))
* capitalize environment names in workflows ([52c4d52](https://github.com/JaegerCaiser/mrdeveloper/commit/52c4d523abc0ca3f4cdca4a0a6b585906e7fc0e8))
* correct cache ordering in all GitHub Actions workflows ([9855442](https://github.com/JaegerCaiser/mrdeveloper/commit/98554429991caa4516ebe35b41af5a5ab948ec51))
* correct cache ordering in all GitHub Actions workflows ([7395deb](https://github.com/JaegerCaiser/mrdeveloper/commit/7395deb5fa5f3a2df5d5efb062d5441532c8a1a5))
* correct error logs upload condition in all workflows ([1450260](https://github.com/JaegerCaiser/mrdeveloper/commit/1450260725047ca9a3e76457af5e8ed02463fe5d))
* correct YAML syntax in production workflow ([ee2adf8](https://github.com/JaegerCaiser/mrdeveloper/commit/ee2adf8289381e8631f9e959859fbefedb7419bc))
* corrige chamada de workflow reutilizável em steps ([66f09ee](https://github.com/JaegerCaiser/mrdeveloper/commit/66f09ee37efa30ca54607e3cbe6f5dc5f440ae2c))
* corrige sintaxe e padroniza workflows CI/CD ([531eb6d](https://github.com/JaegerCaiser/mrdeveloper/commit/531eb6dac13241a2b299d124849af3403256606c))
* desabilita ESLint plugin no build para compatibilidade com react-scripts ([248e889](https://github.com/JaegerCaiser/mrdeveloper/commit/248e889375b23d3781116255de6c59832a029369))
* fix cache positioning in GitHub Actions workflows ([4fc2edc](https://github.com/JaegerCaiser/mrdeveloper/commit/4fc2edc39c6a96167921aeab6807ce7d4a8faef1))
* fix cache positioning in GitHub Actions workflows ([67043de](https://github.com/JaegerCaiser/mrdeveloper/commit/67043dec361b0deec1d446e97ec56c29f79cfd90))
* fix cache warnings and improve error logging in workflows ([6a29a05](https://github.com/JaegerCaiser/mrdeveloper/commit/6a29a056ae7b7e3dc0a743bfb7fca7e98c191b92))
* forçar incremento beta ([7e9f1f7](https://github.com/JaegerCaiser/mrdeveloper/commit/7e9f1f78c2c8e241a5513f0dd8b5f3f4d5c92337))
* improve error log collection by uploading artifacts from failing jobs ([fa0515e](https://github.com/JaegerCaiser/mrdeveloper/commit/fa0515e8ed6cd461dfa30ef5376387102594562e))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([53e82c6](https://github.com/JaegerCaiser/mrdeveloper/commit/53e82c63bfef5f62991659586fb23f1c54d1e0f8))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([3f95685](https://github.com/JaegerCaiser/mrdeveloper/commit/3f95685413633ef871886c027c01b37a3f76a0f7))
* optimize build process and vercel deployment ([c5dc172](https://github.com/JaegerCaiser/mrdeveloper/commit/c5dc172d840165c1f347060698e680a9142cd8ad))
* **prebuild:** avoid running TS loader in CI; use node wrapper + ts-node/esm locally ([e4bdb50](https://github.com/JaegerCaiser/mrdeveloper/commit/e4bdb506773da4a7552f1996d4132ccd5892e5dc))
* remove environment flag from vercel pull for develop workflow ([d2765dc](https://github.com/JaegerCaiser/mrdeveloper/commit/d2765dc903bd8a23cba3c1329c2b9c14c36e904d))
* resolve cache warning by moving cache step after dependency installation ([4aebfb0](https://github.com/JaegerCaiser/mrdeveloper/commit/4aebfb04cac943cdcdc09508d0f4e7298f46d9d0))
* resolve cache warning by moving cache step after dependency installation ([ddfbecc](https://github.com/JaegerCaiser/mrdeveloper/commit/ddfbecc568109e6dc7aa8df08e2bd8c3a20f0a4c))
* resolve pnpm version conflicts in GitHub Actions workflows ([ba0afff](https://github.com/JaegerCaiser/mrdeveloper/commit/ba0afffca21f59d52f32c42e264f2ff453ce587f))
* resolve prebuild script issues for CI and local development ([b0e74f9](https://github.com/JaegerCaiser/mrdeveloper/commit/b0e74f92730f32d45d68644971febccbdd657c66))
* secrets corrigidos ([2627aa4](https://github.com/JaegerCaiser/mrdeveloper/commit/2627aa4cd7f348e6b3e4d08948e71074dae360a4))
* Tag creation only on production deploy (main branch) ([b2d18fb](https://github.com/JaegerCaiser/mrdeveloper/commit/b2d18fb4966a1997a77b88d18313114303c7d670))
* update develop workflow job names for consistent status checks ([16b63f3](https://github.com/JaegerCaiser/mrdeveloper/commit/16b63f398e8256619ff9935a0e466e0ef4ca71ec))
* update git push authentication in preview workflow ([acd34e1](https://github.com/JaegerCaiser/mrdeveloper/commit/acd34e19ded9d9f831070f8e3f129220a33ad7df))
* update preview workflow configuration ([583a27b](https://github.com/JaegerCaiser/mrdeveloper/commit/583a27becb349e5e98fe8588c13954cb3bb59364))
* update preview workflow formatting ([c761aa5](https://github.com/JaegerCaiser/mrdeveloper/commit/c761aa532268fead1e99eaa18dd894dfdf5da35f))
* update preview workflow permissions and formatting ([32f8d58](https://github.com/JaegerCaiser/mrdeveloper/commit/32f8d58e4b541aaa5c86f1fb1d2a805c86b292dc))
* update reusable Vercel deploy workflow ([c210f1a](https://github.com/JaegerCaiser/mrdeveloper/commit/c210f1af63929c68d677c20d5041cd3a7f63b555))
* use corepack for pnpm in Vercel to avoid version conflicts ([17d0eb2](https://github.com/JaegerCaiser/mrdeveloper/commit/17d0eb231b4eff08b49d1a16903429e5f62be6c6))


### Features

* add error logs upload job to all CI workflows ([6eb24ea](https://github.com/JaegerCaiser/mrdeveloper/commit/6eb24ea7f9e43c76503af1d392da4982f56a78db))
* add error logs upload job to all CI workflows ([bfe7227](https://github.com/JaegerCaiser/mrdeveloper/commit/bfe72278620939d132fb94a5dc55dbdff363c3fc))
* add pr-checks workflow for required status checks in PRs ([d4813e1](https://github.com/JaegerCaiser/mrdeveloper/commit/d4813e15fb3b7d18cc28036b5f8f021103e1836c))
* add Vercel Analytics integration ([d034ff4](https://github.com/JaegerCaiser/mrdeveloper/commit/d034ff4925db78a205fa57da1fef8ad16dca988e))
* adiciona animação de scroll contínuo na imagem de perfil ([be6f5e3](https://github.com/JaegerCaiser/mrdeveloper/commit/be6f5e38a7b6aa3e51d953b6e267ea572b70e1a0))
* adiciona workflow para deletar branches após merge ([703b4ba](https://github.com/JaegerCaiser/mrdeveloper/commit/703b4ba902d20293313fb9668cbedc763bf0a947))
* ajusta e otimiza animação de scroll da imagem de perfil ([058b4ff](https://github.com/JaegerCaiser/mrdeveloper/commit/058b4ff6c209c22e1fe2a903680906520b436e6b))
* convert all CSS to SCSS and fix layout issues ([0635a7b](https://github.com/JaegerCaiser/mrdeveloper/commit/0635a7be87efb158de2a219822d2d477b9b55491))
* implement dummy-pass strategy to prevent infinite loop in beta-release tagging ([efc534d](https://github.com/JaegerCaiser/mrdeveloper/commit/efc534d0d4b9a1d75640b272af658c73c33b6207))
* improve GitHub Actions workflows ([82fa271](https://github.com/JaegerCaiser/mrdeveloper/commit/82fa2719065ebb66dc6d7f24d8f808216c0f3a43))
* install and configure ESLint ([7b65d89](https://github.com/JaegerCaiser/mrdeveloper/commit/7b65d8951cac39c40dc2a34afc4a5432d04df829))
* Melhoria no reporte de status do deploy de preview Vercel ([5f27559](https://github.com/JaegerCaiser/mrdeveloper/commit/5f2755923287a491ca5003261b44fed4e24a81b8))
* Melhoria no reporte de status do deploy de preview Vercel ([a879928](https://github.com/JaegerCaiser/mrdeveloper/commit/a879928e6ada5a11f557342df9dc3c2cfcc6ed91))
* Remove personal interests from about section ([#19](https://github.com/JaegerCaiser/mrdeveloper/issues/19)) ([79ec672](https://github.com/JaegerCaiser/mrdeveloper/commit/79ec672c8e352a6c52f2463c72693f3ca9434fc7))
* Resolve profile animation issues and add fadeIn effect ([#10](https://github.com/JaegerCaiser/mrdeveloper/issues/10)) ([8d27785](https://github.com/JaegerCaiser/mrdeveloper/commit/8d2778545b524cdf546cddfbcb69e851cf74a11f))
* **seo:** improve on-page SEO and crawlability ([#20](https://github.com/JaegerCaiser/mrdeveloper/issues/20)) ([0600e56](https://github.com/JaegerCaiser/mrdeveloper/commit/0600e566c09012f9186b6ad5cfcdf1786274a4d2))
* update deployment workflows to bobheadxi/deployments v1.5.0 ([3c307cd](https://github.com/JaegerCaiser/mrdeveloper/commit/3c307cd1f7c857cc9221ccf51c328a2bc6507ed4))
* Update deployment workflows to use bobheadxi/deployments action ([6c4fa7f](https://github.com/JaegerCaiser/mrdeveloper/commit/6c4fa7fa11237a1a2dd715a98ddbdaafe4ec632e))
* update documentation and setup for GitHub Pages ([fbe8a79](https://github.com/JaegerCaiser/mrdeveloper/commit/fbe8a795d745f42874785eebe8bf61de8410304b))
* **workflows:** Melhora os workflows de CI/CD e atualiza o contrato ([488363e](https://github.com/JaegerCaiser/mrdeveloper/commit/488363e50d49e25820a81b4f23bff29cc7e350e1))


### Performance Improvements

* add intelligent caching to CI workflows ([d501df4](https://github.com/JaegerCaiser/mrdeveloper/commit/d501df4dfb2e95f02316333dae43e08a8f96ff40))


### Reverts

* remove duplicate pr-checks workflow ([93b6258](https://github.com/JaegerCaiser/mrdeveloper/commit/93b62588e2dc1b480f3a2570d6b43027741b7c23))

# [1.1.0-beta.1](https://github.com/JaegerCaiser/mrdeveloper/compare/v1.0.3...v1.1.0-beta.1) (2025-11-03)


### Bug Fixes

* add contents write permission to delete merged branches workflow ([57f2e07](https://github.com/JaegerCaiser/mrdeveloper/commit/57f2e07d00dfd93d5f8aaa39a753ce9380560d69))
* add pnpm setup step to develop workflow ([e7d2efb](https://github.com/JaegerCaiser/mrdeveloper/commit/e7d2efb35d382983e02170246a54692c6d88622d))
* adiciona dependências de teste nos jobs de deploy ([f897087](https://github.com/JaegerCaiser/mrdeveloper/commit/f89708776fe506d61cea3e537c3f0a7504ee7c16))
* **animated-background:** hoist computeConfig, ensure resize uses CSS pixels and fix init order ([7de9b14](https://github.com/JaegerCaiser/mrdeveloper/commit/7de9b147d9c719dbc7085089008a6a0fc2c7ae65))
* capitalize environment names in workflows ([52c4d52](https://github.com/JaegerCaiser/mrdeveloper/commit/52c4d523abc0ca3f4cdca4a0a6b585906e7fc0e8))
* correct cache ordering in all GitHub Actions workflows ([9855442](https://github.com/JaegerCaiser/mrdeveloper/commit/98554429991caa4516ebe35b41af5a5ab948ec51))
* correct cache ordering in all GitHub Actions workflows ([7395deb](https://github.com/JaegerCaiser/mrdeveloper/commit/7395deb5fa5f3a2df5d5efb062d5441532c8a1a5))
* correct error logs upload condition in all workflows ([1450260](https://github.com/JaegerCaiser/mrdeveloper/commit/1450260725047ca9a3e76457af5e8ed02463fe5d))
* correct YAML syntax in production workflow ([ee2adf8](https://github.com/JaegerCaiser/mrdeveloper/commit/ee2adf8289381e8631f9e959859fbefedb7419bc))
* corrige chamada de workflow reutilizável em steps ([66f09ee](https://github.com/JaegerCaiser/mrdeveloper/commit/66f09ee37efa30ca54607e3cbe6f5dc5f440ae2c))
* corrige sintaxe e padroniza workflows CI/CD ([531eb6d](https://github.com/JaegerCaiser/mrdeveloper/commit/531eb6dac13241a2b299d124849af3403256606c))
* desabilita ESLint plugin no build para compatibilidade com react-scripts ([248e889](https://github.com/JaegerCaiser/mrdeveloper/commit/248e889375b23d3781116255de6c59832a029369))
* fix cache positioning in GitHub Actions workflows ([4fc2edc](https://github.com/JaegerCaiser/mrdeveloper/commit/4fc2edc39c6a96167921aeab6807ce7d4a8faef1))
* fix cache positioning in GitHub Actions workflows ([67043de](https://github.com/JaegerCaiser/mrdeveloper/commit/67043dec361b0deec1d446e97ec56c29f79cfd90))
* fix cache warnings and improve error logging in workflows ([6a29a05](https://github.com/JaegerCaiser/mrdeveloper/commit/6a29a056ae7b7e3dc0a743bfb7fca7e98c191b92))
* forçar incremento beta ([7e9f1f7](https://github.com/JaegerCaiser/mrdeveloper/commit/7e9f1f78c2c8e241a5513f0dd8b5f3f4d5c92337))
* improve error log collection by uploading artifacts from failing jobs ([fa0515e](https://github.com/JaegerCaiser/mrdeveloper/commit/fa0515e8ed6cd461dfa30ef5376387102594562e))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([53e82c6](https://github.com/JaegerCaiser/mrdeveloper/commit/53e82c63bfef5f62991659586fb23f1c54d1e0f8))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([3f95685](https://github.com/JaegerCaiser/mrdeveloper/commit/3f95685413633ef871886c027c01b37a3f76a0f7))
* optimize build process and vercel deployment ([c5dc172](https://github.com/JaegerCaiser/mrdeveloper/commit/c5dc172d840165c1f347060698e680a9142cd8ad))
* **prebuild:** avoid running TS loader in CI; use node wrapper + ts-node/esm locally ([e4bdb50](https://github.com/JaegerCaiser/mrdeveloper/commit/e4bdb506773da4a7552f1996d4132ccd5892e5dc))
* remove environment flag from vercel pull for develop workflow ([d2765dc](https://github.com/JaegerCaiser/mrdeveloper/commit/d2765dc903bd8a23cba3c1329c2b9c14c36e904d))
* resolve cache warning by moving cache step after dependency installation ([4aebfb0](https://github.com/JaegerCaiser/mrdeveloper/commit/4aebfb04cac943cdcdc09508d0f4e7298f46d9d0))
* resolve cache warning by moving cache step after dependency installation ([ddfbecc](https://github.com/JaegerCaiser/mrdeveloper/commit/ddfbecc568109e6dc7aa8df08e2bd8c3a20f0a4c))
* resolve pnpm version conflicts in GitHub Actions workflows ([ba0afff](https://github.com/JaegerCaiser/mrdeveloper/commit/ba0afffca21f59d52f32c42e264f2ff453ce587f))
* resolve prebuild script issues for CI and local development ([b0e74f9](https://github.com/JaegerCaiser/mrdeveloper/commit/b0e74f92730f32d45d68644971febccbdd657c66))
* secrets corrigidos ([2627aa4](https://github.com/JaegerCaiser/mrdeveloper/commit/2627aa4cd7f348e6b3e4d08948e71074dae360a4))
* Tag creation only on production deploy (main branch) ([b2d18fb](https://github.com/JaegerCaiser/mrdeveloper/commit/b2d18fb4966a1997a77b88d18313114303c7d670))
* update develop workflow job names for consistent status checks ([16b63f3](https://github.com/JaegerCaiser/mrdeveloper/commit/16b63f398e8256619ff9935a0e466e0ef4ca71ec))
* update git push authentication in preview workflow ([acd34e1](https://github.com/JaegerCaiser/mrdeveloper/commit/acd34e19ded9d9f831070f8e3f129220a33ad7df))
* update preview workflow configuration ([583a27b](https://github.com/JaegerCaiser/mrdeveloper/commit/583a27becb349e5e98fe8588c13954cb3bb59364))
* update preview workflow formatting ([c761aa5](https://github.com/JaegerCaiser/mrdeveloper/commit/c761aa532268fead1e99eaa18dd894dfdf5da35f))
* update preview workflow permissions and formatting ([32f8d58](https://github.com/JaegerCaiser/mrdeveloper/commit/32f8d58e4b541aaa5c86f1fb1d2a805c86b292dc))
* update reusable Vercel deploy workflow ([c210f1a](https://github.com/JaegerCaiser/mrdeveloper/commit/c210f1af63929c68d677c20d5041cd3a7f63b555))
* use corepack for pnpm in Vercel to avoid version conflicts ([17d0eb2](https://github.com/JaegerCaiser/mrdeveloper/commit/17d0eb231b4eff08b49d1a16903429e5f62be6c6))


### Features

* add error logs upload job to all CI workflows ([6eb24ea](https://github.com/JaegerCaiser/mrdeveloper/commit/6eb24ea7f9e43c76503af1d392da4982f56a78db))
* add error logs upload job to all CI workflows ([bfe7227](https://github.com/JaegerCaiser/mrdeveloper/commit/bfe72278620939d132fb94a5dc55dbdff363c3fc))
* add pr-checks workflow for required status checks in PRs ([d4813e1](https://github.com/JaegerCaiser/mrdeveloper/commit/d4813e15fb3b7d18cc28036b5f8f021103e1836c))
* add Vercel Analytics integration ([d034ff4](https://github.com/JaegerCaiser/mrdeveloper/commit/d034ff4925db78a205fa57da1fef8ad16dca988e))
* adiciona animação de scroll contínuo na imagem de perfil ([be6f5e3](https://github.com/JaegerCaiser/mrdeveloper/commit/be6f5e38a7b6aa3e51d953b6e267ea572b70e1a0))
* adiciona workflow para deletar branches após merge ([703b4ba](https://github.com/JaegerCaiser/mrdeveloper/commit/703b4ba902d20293313fb9668cbedc763bf0a947))
* ajusta e otimiza animação de scroll da imagem de perfil ([058b4ff](https://github.com/JaegerCaiser/mrdeveloper/commit/058b4ff6c209c22e1fe2a903680906520b436e6b))
* convert all CSS to SCSS and fix layout issues ([0635a7b](https://github.com/JaegerCaiser/mrdeveloper/commit/0635a7be87efb158de2a219822d2d477b9b55491))
* implement dummy-pass strategy to prevent infinite loop in beta-release tagging ([efc534d](https://github.com/JaegerCaiser/mrdeveloper/commit/efc534d0d4b9a1d75640b272af658c73c33b6207))
* improve GitHub Actions workflows ([82fa271](https://github.com/JaegerCaiser/mrdeveloper/commit/82fa2719065ebb66dc6d7f24d8f808216c0f3a43))
* install and configure ESLint ([7b65d89](https://github.com/JaegerCaiser/mrdeveloper/commit/7b65d8951cac39c40dc2a34afc4a5432d04df829))
* Melhoria no reporte de status do deploy de preview Vercel ([5f27559](https://github.com/JaegerCaiser/mrdeveloper/commit/5f2755923287a491ca5003261b44fed4e24a81b8))
* Melhoria no reporte de status do deploy de preview Vercel ([a879928](https://github.com/JaegerCaiser/mrdeveloper/commit/a879928e6ada5a11f557342df9dc3c2cfcc6ed91))
* Remove personal interests from about section ([#19](https://github.com/JaegerCaiser/mrdeveloper/issues/19)) ([79ec672](https://github.com/JaegerCaiser/mrdeveloper/commit/79ec672c8e352a6c52f2463c72693f3ca9434fc7))
* Resolve profile animation issues and add fadeIn effect ([#10](https://github.com/JaegerCaiser/mrdeveloper/issues/10)) ([8d27785](https://github.com/JaegerCaiser/mrdeveloper/commit/8d2778545b524cdf546cddfbcb69e851cf74a11f))
* **seo:** improve on-page SEO and crawlability ([#20](https://github.com/JaegerCaiser/mrdeveloper/issues/20)) ([0600e56](https://github.com/JaegerCaiser/mrdeveloper/commit/0600e566c09012f9186b6ad5cfcdf1786274a4d2))
* update deployment workflows to bobheadxi/deployments v1.5.0 ([3c307cd](https://github.com/JaegerCaiser/mrdeveloper/commit/3c307cd1f7c857cc9221ccf51c328a2bc6507ed4))
* Update deployment workflows to use bobheadxi/deployments action ([6c4fa7f](https://github.com/JaegerCaiser/mrdeveloper/commit/6c4fa7fa11237a1a2dd715a98ddbdaafe4ec632e))
* update documentation and setup for GitHub Pages ([fbe8a79](https://github.com/JaegerCaiser/mrdeveloper/commit/fbe8a795d745f42874785eebe8bf61de8410304b))
* **workflows:** Melhora os workflows de CI/CD e atualiza o contrato ([488363e](https://github.com/JaegerCaiser/mrdeveloper/commit/488363e50d49e25820a81b4f23bff29cc7e350e1))


### Performance Improvements

* add intelligent caching to CI workflows ([d501df4](https://github.com/JaegerCaiser/mrdeveloper/commit/d501df4dfb2e95f02316333dae43e08a8f96ff40))


### Reverts

* remove duplicate pr-checks workflow ([93b6258](https://github.com/JaegerCaiser/mrdeveloper/commit/93b62588e2dc1b480f3a2570d6b43027741b7c23))

# [1.1.0-beta.1](https://github.com/JaegerCaiser/mrdeveloper/compare/v1.0.3...v1.1.0-beta.1) (2025-11-03)


### Bug Fixes

* add contents write permission to delete merged branches workflow ([57f2e07](https://github.com/JaegerCaiser/mrdeveloper/commit/57f2e07d00dfd93d5f8aaa39a753ce9380560d69))
* add pnpm setup step to develop workflow ([e7d2efb](https://github.com/JaegerCaiser/mrdeveloper/commit/e7d2efb35d382983e02170246a54692c6d88622d))
* adiciona dependências de teste nos jobs de deploy ([f897087](https://github.com/JaegerCaiser/mrdeveloper/commit/f89708776fe506d61cea3e537c3f0a7504ee7c16))
* **animated-background:** hoist computeConfig, ensure resize uses CSS pixels and fix init order ([7de9b14](https://github.com/JaegerCaiser/mrdeveloper/commit/7de9b147d9c719dbc7085089008a6a0fc2c7ae65))
* capitalize environment names in workflows ([52c4d52](https://github.com/JaegerCaiser/mrdeveloper/commit/52c4d523abc0ca3f4cdca4a0a6b585906e7fc0e8))
* correct cache ordering in all GitHub Actions workflows ([9855442](https://github.com/JaegerCaiser/mrdeveloper/commit/98554429991caa4516ebe35b41af5a5ab948ec51))
* correct cache ordering in all GitHub Actions workflows ([7395deb](https://github.com/JaegerCaiser/mrdeveloper/commit/7395deb5fa5f3a2df5d5efb062d5441532c8a1a5))
* correct error logs upload condition in all workflows ([1450260](https://github.com/JaegerCaiser/mrdeveloper/commit/1450260725047ca9a3e76457af5e8ed02463fe5d))
* correct YAML syntax in production workflow ([ee2adf8](https://github.com/JaegerCaiser/mrdeveloper/commit/ee2adf8289381e8631f9e959859fbefedb7419bc))
* corrige chamada de workflow reutilizável em steps ([66f09ee](https://github.com/JaegerCaiser/mrdeveloper/commit/66f09ee37efa30ca54607e3cbe6f5dc5f440ae2c))
* corrige sintaxe e padroniza workflows CI/CD ([531eb6d](https://github.com/JaegerCaiser/mrdeveloper/commit/531eb6dac13241a2b299d124849af3403256606c))
* desabilita ESLint plugin no build para compatibilidade com react-scripts ([248e889](https://github.com/JaegerCaiser/mrdeveloper/commit/248e889375b23d3781116255de6c59832a029369))
* fix cache positioning in GitHub Actions workflows ([4fc2edc](https://github.com/JaegerCaiser/mrdeveloper/commit/4fc2edc39c6a96167921aeab6807ce7d4a8faef1))
* fix cache positioning in GitHub Actions workflows ([67043de](https://github.com/JaegerCaiser/mrdeveloper/commit/67043dec361b0deec1d446e97ec56c29f79cfd90))
* fix cache warnings and improve error logging in workflows ([6a29a05](https://github.com/JaegerCaiser/mrdeveloper/commit/6a29a056ae7b7e3dc0a743bfb7fca7e98c191b92))
* forçar incremento beta ([7e9f1f7](https://github.com/JaegerCaiser/mrdeveloper/commit/7e9f1f78c2c8e241a5513f0dd8b5f3f4d5c92337))
* improve error log collection by uploading artifacts from failing jobs ([fa0515e](https://github.com/JaegerCaiser/mrdeveloper/commit/fa0515e8ed6cd461dfa30ef5376387102594562e))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([53e82c6](https://github.com/JaegerCaiser/mrdeveloper/commit/53e82c63bfef5f62991659586fb23f1c54d1e0f8))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([3f95685](https://github.com/JaegerCaiser/mrdeveloper/commit/3f95685413633ef871886c027c01b37a3f76a0f7))
* optimize build process and vercel deployment ([c5dc172](https://github.com/JaegerCaiser/mrdeveloper/commit/c5dc172d840165c1f347060698e680a9142cd8ad))
* **prebuild:** avoid running TS loader in CI; use node wrapper + ts-node/esm locally ([e4bdb50](https://github.com/JaegerCaiser/mrdeveloper/commit/e4bdb506773da4a7552f1996d4132ccd5892e5dc))
* remove environment flag from vercel pull for develop workflow ([d2765dc](https://github.com/JaegerCaiser/mrdeveloper/commit/d2765dc903bd8a23cba3c1329c2b9c14c36e904d))
* resolve cache warning by moving cache step after dependency installation ([4aebfb0](https://github.com/JaegerCaiser/mrdeveloper/commit/4aebfb04cac943cdcdc09508d0f4e7298f46d9d0))
* resolve cache warning by moving cache step after dependency installation ([ddfbecc](https://github.com/JaegerCaiser/mrdeveloper/commit/ddfbecc568109e6dc7aa8df08e2bd8c3a20f0a4c))
* resolve pnpm version conflicts in GitHub Actions workflows ([ba0afff](https://github.com/JaegerCaiser/mrdeveloper/commit/ba0afffca21f59d52f32c42e264f2ff453ce587f))
* resolve prebuild script issues for CI and local development ([b0e74f9](https://github.com/JaegerCaiser/mrdeveloper/commit/b0e74f92730f32d45d68644971febccbdd657c66))
* secrets corrigidos ([2627aa4](https://github.com/JaegerCaiser/mrdeveloper/commit/2627aa4cd7f348e6b3e4d08948e71074dae360a4))
* Tag creation only on production deploy (main branch) ([b2d18fb](https://github.com/JaegerCaiser/mrdeveloper/commit/b2d18fb4966a1997a77b88d18313114303c7d670))
* update develop workflow job names for consistent status checks ([16b63f3](https://github.com/JaegerCaiser/mrdeveloper/commit/16b63f398e8256619ff9935a0e466e0ef4ca71ec))
* update git push authentication in preview workflow ([acd34e1](https://github.com/JaegerCaiser/mrdeveloper/commit/acd34e19ded9d9f831070f8e3f129220a33ad7df))
* update preview workflow configuration ([583a27b](https://github.com/JaegerCaiser/mrdeveloper/commit/583a27becb349e5e98fe8588c13954cb3bb59364))
* update preview workflow formatting ([c761aa5](https://github.com/JaegerCaiser/mrdeveloper/commit/c761aa532268fead1e99eaa18dd894dfdf5da35f))
* update preview workflow permissions and formatting ([32f8d58](https://github.com/JaegerCaiser/mrdeveloper/commit/32f8d58e4b541aaa5c86f1fb1d2a805c86b292dc))
* update reusable Vercel deploy workflow ([c210f1a](https://github.com/JaegerCaiser/mrdeveloper/commit/c210f1af63929c68d677c20d5041cd3a7f63b555))
* use corepack for pnpm in Vercel to avoid version conflicts ([17d0eb2](https://github.com/JaegerCaiser/mrdeveloper/commit/17d0eb231b4eff08b49d1a16903429e5f62be6c6))


### Features

* add error logs upload job to all CI workflows ([6eb24ea](https://github.com/JaegerCaiser/mrdeveloper/commit/6eb24ea7f9e43c76503af1d392da4982f56a78db))
* add error logs upload job to all CI workflows ([bfe7227](https://github.com/JaegerCaiser/mrdeveloper/commit/bfe72278620939d132fb94a5dc55dbdff363c3fc))
* add pr-checks workflow for required status checks in PRs ([d4813e1](https://github.com/JaegerCaiser/mrdeveloper/commit/d4813e15fb3b7d18cc28036b5f8f021103e1836c))
* add Vercel Analytics integration ([d034ff4](https://github.com/JaegerCaiser/mrdeveloper/commit/d034ff4925db78a205fa57da1fef8ad16dca988e))
* adiciona animação de scroll contínuo na imagem de perfil ([be6f5e3](https://github.com/JaegerCaiser/mrdeveloper/commit/be6f5e38a7b6aa3e51d953b6e267ea572b70e1a0))
* adiciona workflow para deletar branches após merge ([703b4ba](https://github.com/JaegerCaiser/mrdeveloper/commit/703b4ba902d20293313fb9668cbedc763bf0a947))
* ajusta e otimiza animação de scroll da imagem de perfil ([058b4ff](https://github.com/JaegerCaiser/mrdeveloper/commit/058b4ff6c209c22e1fe2a903680906520b436e6b))
* convert all CSS to SCSS and fix layout issues ([0635a7b](https://github.com/JaegerCaiser/mrdeveloper/commit/0635a7be87efb158de2a219822d2d477b9b55491))
* implement dummy-pass strategy to prevent infinite loop in beta-release tagging ([efc534d](https://github.com/JaegerCaiser/mrdeveloper/commit/efc534d0d4b9a1d75640b272af658c73c33b6207))
* improve GitHub Actions workflows ([82fa271](https://github.com/JaegerCaiser/mrdeveloper/commit/82fa2719065ebb66dc6d7f24d8f808216c0f3a43))
* install and configure ESLint ([7b65d89](https://github.com/JaegerCaiser/mrdeveloper/commit/7b65d8951cac39c40dc2a34afc4a5432d04df829))
* Melhoria no reporte de status do deploy de preview Vercel ([5f27559](https://github.com/JaegerCaiser/mrdeveloper/commit/5f2755923287a491ca5003261b44fed4e24a81b8))
* Melhoria no reporte de status do deploy de preview Vercel ([a879928](https://github.com/JaegerCaiser/mrdeveloper/commit/a879928e6ada5a11f557342df9dc3c2cfcc6ed91))
* Remove personal interests from about section ([#19](https://github.com/JaegerCaiser/mrdeveloper/issues/19)) ([79ec672](https://github.com/JaegerCaiser/mrdeveloper/commit/79ec672c8e352a6c52f2463c72693f3ca9434fc7))
* Resolve profile animation issues and add fadeIn effect ([#10](https://github.com/JaegerCaiser/mrdeveloper/issues/10)) ([8d27785](https://github.com/JaegerCaiser/mrdeveloper/commit/8d2778545b524cdf546cddfbcb69e851cf74a11f))
* **seo:** improve on-page SEO and crawlability ([#20](https://github.com/JaegerCaiser/mrdeveloper/issues/20)) ([0600e56](https://github.com/JaegerCaiser/mrdeveloper/commit/0600e566c09012f9186b6ad5cfcdf1786274a4d2))
* update deployment workflows to bobheadxi/deployments v1.5.0 ([3c307cd](https://github.com/JaegerCaiser/mrdeveloper/commit/3c307cd1f7c857cc9221ccf51c328a2bc6507ed4))
* Update deployment workflows to use bobheadxi/deployments action ([6c4fa7f](https://github.com/JaegerCaiser/mrdeveloper/commit/6c4fa7fa11237a1a2dd715a98ddbdaafe4ec632e))
* update documentation and setup for GitHub Pages ([fbe8a79](https://github.com/JaegerCaiser/mrdeveloper/commit/fbe8a795d745f42874785eebe8bf61de8410304b))
* **workflows:** Melhora os workflows de CI/CD e atualiza o contrato ([488363e](https://github.com/JaegerCaiser/mrdeveloper/commit/488363e50d49e25820a81b4f23bff29cc7e350e1))


### Performance Improvements

* add intelligent caching to CI workflows ([d501df4](https://github.com/JaegerCaiser/mrdeveloper/commit/d501df4dfb2e95f02316333dae43e08a8f96ff40))


### Reverts

* remove duplicate pr-checks workflow ([93b6258](https://github.com/JaegerCaiser/mrdeveloper/commit/93b62588e2dc1b480f3a2570d6b43027741b7c23))

# [1.1.0-beta.1](https://github.com/JaegerCaiser/mrdeveloper/compare/v1.0.3...v1.1.0-beta.1) (2025-11-03)


### Bug Fixes

* add contents write permission to delete merged branches workflow ([57f2e07](https://github.com/JaegerCaiser/mrdeveloper/commit/57f2e07d00dfd93d5f8aaa39a753ce9380560d69))
* add pnpm setup step to develop workflow ([e7d2efb](https://github.com/JaegerCaiser/mrdeveloper/commit/e7d2efb35d382983e02170246a54692c6d88622d))
* adiciona dependências de teste nos jobs de deploy ([f897087](https://github.com/JaegerCaiser/mrdeveloper/commit/f89708776fe506d61cea3e537c3f0a7504ee7c16))
* **animated-background:** hoist computeConfig, ensure resize uses CSS pixels and fix init order ([7de9b14](https://github.com/JaegerCaiser/mrdeveloper/commit/7de9b147d9c719dbc7085089008a6a0fc2c7ae65))
* capitalize environment names in workflows ([52c4d52](https://github.com/JaegerCaiser/mrdeveloper/commit/52c4d523abc0ca3f4cdca4a0a6b585906e7fc0e8))
* correct cache ordering in all GitHub Actions workflows ([9855442](https://github.com/JaegerCaiser/mrdeveloper/commit/98554429991caa4516ebe35b41af5a5ab948ec51))
* correct cache ordering in all GitHub Actions workflows ([7395deb](https://github.com/JaegerCaiser/mrdeveloper/commit/7395deb5fa5f3a2df5d5efb062d5441532c8a1a5))
* correct error logs upload condition in all workflows ([1450260](https://github.com/JaegerCaiser/mrdeveloper/commit/1450260725047ca9a3e76457af5e8ed02463fe5d))
* correct YAML syntax in production workflow ([ee2adf8](https://github.com/JaegerCaiser/mrdeveloper/commit/ee2adf8289381e8631f9e959859fbefedb7419bc))
* corrige chamada de workflow reutilizável em steps ([66f09ee](https://github.com/JaegerCaiser/mrdeveloper/commit/66f09ee37efa30ca54607e3cbe6f5dc5f440ae2c))
* corrige sintaxe e padroniza workflows CI/CD ([531eb6d](https://github.com/JaegerCaiser/mrdeveloper/commit/531eb6dac13241a2b299d124849af3403256606c))
* desabilita ESLint plugin no build para compatibilidade com react-scripts ([248e889](https://github.com/JaegerCaiser/mrdeveloper/commit/248e889375b23d3781116255de6c59832a029369))
* fix cache positioning in GitHub Actions workflows ([4fc2edc](https://github.com/JaegerCaiser/mrdeveloper/commit/4fc2edc39c6a96167921aeab6807ce7d4a8faef1))
* fix cache positioning in GitHub Actions workflows ([67043de](https://github.com/JaegerCaiser/mrdeveloper/commit/67043dec361b0deec1d446e97ec56c29f79cfd90))
* fix cache warnings and improve error logging in workflows ([6a29a05](https://github.com/JaegerCaiser/mrdeveloper/commit/6a29a056ae7b7e3dc0a743bfb7fca7e98c191b92))
* improve error log collection by uploading artifacts from failing jobs ([fa0515e](https://github.com/JaegerCaiser/mrdeveloper/commit/fa0515e8ed6cd461dfa30ef5376387102594562e))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([53e82c6](https://github.com/JaegerCaiser/mrdeveloper/commit/53e82c63bfef5f62991659586fb23f1c54d1e0f8))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([3f95685](https://github.com/JaegerCaiser/mrdeveloper/commit/3f95685413633ef871886c027c01b37a3f76a0f7))
* optimize build process and vercel deployment ([c5dc172](https://github.com/JaegerCaiser/mrdeveloper/commit/c5dc172d840165c1f347060698e680a9142cd8ad))
* **prebuild:** avoid running TS loader in CI; use node wrapper + ts-node/esm locally ([e4bdb50](https://github.com/JaegerCaiser/mrdeveloper/commit/e4bdb506773da4a7552f1996d4132ccd5892e5dc))
* remove environment flag from vercel pull for develop workflow ([d2765dc](https://github.com/JaegerCaiser/mrdeveloper/commit/d2765dc903bd8a23cba3c1329c2b9c14c36e904d))
* resolve cache warning by moving cache step after dependency installation ([4aebfb0](https://github.com/JaegerCaiser/mrdeveloper/commit/4aebfb04cac943cdcdc09508d0f4e7298f46d9d0))
* resolve cache warning by moving cache step after dependency installation ([ddfbecc](https://github.com/JaegerCaiser/mrdeveloper/commit/ddfbecc568109e6dc7aa8df08e2bd8c3a20f0a4c))
* resolve pnpm version conflicts in GitHub Actions workflows ([ba0afff](https://github.com/JaegerCaiser/mrdeveloper/commit/ba0afffca21f59d52f32c42e264f2ff453ce587f))
* resolve prebuild script issues for CI and local development ([b0e74f9](https://github.com/JaegerCaiser/mrdeveloper/commit/b0e74f92730f32d45d68644971febccbdd657c66))
* secrets corrigidos ([2627aa4](https://github.com/JaegerCaiser/mrdeveloper/commit/2627aa4cd7f348e6b3e4d08948e71074dae360a4))
* Tag creation only on production deploy (main branch) ([b2d18fb](https://github.com/JaegerCaiser/mrdeveloper/commit/b2d18fb4966a1997a77b88d18313114303c7d670))
* update develop workflow job names for consistent status checks ([16b63f3](https://github.com/JaegerCaiser/mrdeveloper/commit/16b63f398e8256619ff9935a0e466e0ef4ca71ec))
* update git push authentication in preview workflow ([acd34e1](https://github.com/JaegerCaiser/mrdeveloper/commit/acd34e19ded9d9f831070f8e3f129220a33ad7df))
* update preview workflow configuration ([583a27b](https://github.com/JaegerCaiser/mrdeveloper/commit/583a27becb349e5e98fe8588c13954cb3bb59364))
* update preview workflow formatting ([c761aa5](https://github.com/JaegerCaiser/mrdeveloper/commit/c761aa532268fead1e99eaa18dd894dfdf5da35f))
* update preview workflow permissions and formatting ([32f8d58](https://github.com/JaegerCaiser/mrdeveloper/commit/32f8d58e4b541aaa5c86f1fb1d2a805c86b292dc))
* update reusable Vercel deploy workflow ([c210f1a](https://github.com/JaegerCaiser/mrdeveloper/commit/c210f1af63929c68d677c20d5041cd3a7f63b555))
* use corepack for pnpm in Vercel to avoid version conflicts ([17d0eb2](https://github.com/JaegerCaiser/mrdeveloper/commit/17d0eb231b4eff08b49d1a16903429e5f62be6c6))


### Features

* add error logs upload job to all CI workflows ([6eb24ea](https://github.com/JaegerCaiser/mrdeveloper/commit/6eb24ea7f9e43c76503af1d392da4982f56a78db))
* add error logs upload job to all CI workflows ([bfe7227](https://github.com/JaegerCaiser/mrdeveloper/commit/bfe72278620939d132fb94a5dc55dbdff363c3fc))
* add pr-checks workflow for required status checks in PRs ([d4813e1](https://github.com/JaegerCaiser/mrdeveloper/commit/d4813e15fb3b7d18cc28036b5f8f021103e1836c))
* add Vercel Analytics integration ([d034ff4](https://github.com/JaegerCaiser/mrdeveloper/commit/d034ff4925db78a205fa57da1fef8ad16dca988e))
* adiciona animação de scroll contínuo na imagem de perfil ([be6f5e3](https://github.com/JaegerCaiser/mrdeveloper/commit/be6f5e38a7b6aa3e51d953b6e267ea572b70e1a0))
* adiciona workflow para deletar branches após merge ([703b4ba](https://github.com/JaegerCaiser/mrdeveloper/commit/703b4ba902d20293313fb9668cbedc763bf0a947))
* ajusta e otimiza animação de scroll da imagem de perfil ([058b4ff](https://github.com/JaegerCaiser/mrdeveloper/commit/058b4ff6c209c22e1fe2a903680906520b436e6b))
* convert all CSS to SCSS and fix layout issues ([0635a7b](https://github.com/JaegerCaiser/mrdeveloper/commit/0635a7be87efb158de2a219822d2d477b9b55491))
* implement dummy-pass strategy to prevent infinite loop in beta-release tagging ([efc534d](https://github.com/JaegerCaiser/mrdeveloper/commit/efc534d0d4b9a1d75640b272af658c73c33b6207))
* improve GitHub Actions workflows ([82fa271](https://github.com/JaegerCaiser/mrdeveloper/commit/82fa2719065ebb66dc6d7f24d8f808216c0f3a43))
* install and configure ESLint ([7b65d89](https://github.com/JaegerCaiser/mrdeveloper/commit/7b65d8951cac39c40dc2a34afc4a5432d04df829))
* Melhoria no reporte de status do deploy de preview Vercel ([5f27559](https://github.com/JaegerCaiser/mrdeveloper/commit/5f2755923287a491ca5003261b44fed4e24a81b8))
* Melhoria no reporte de status do deploy de preview Vercel ([a879928](https://github.com/JaegerCaiser/mrdeveloper/commit/a879928e6ada5a11f557342df9dc3c2cfcc6ed91))
* Remove personal interests from about section ([#19](https://github.com/JaegerCaiser/mrdeveloper/issues/19)) ([79ec672](https://github.com/JaegerCaiser/mrdeveloper/commit/79ec672c8e352a6c52f2463c72693f3ca9434fc7))
* Resolve profile animation issues and add fadeIn effect ([#10](https://github.com/JaegerCaiser/mrdeveloper/issues/10)) ([8d27785](https://github.com/JaegerCaiser/mrdeveloper/commit/8d2778545b524cdf546cddfbcb69e851cf74a11f))
* **seo:** improve on-page SEO and crawlability ([#20](https://github.com/JaegerCaiser/mrdeveloper/issues/20)) ([0600e56](https://github.com/JaegerCaiser/mrdeveloper/commit/0600e566c09012f9186b6ad5cfcdf1786274a4d2))
* update deployment workflows to bobheadxi/deployments v1.5.0 ([3c307cd](https://github.com/JaegerCaiser/mrdeveloper/commit/3c307cd1f7c857cc9221ccf51c328a2bc6507ed4))
* Update deployment workflows to use bobheadxi/deployments action ([6c4fa7f](https://github.com/JaegerCaiser/mrdeveloper/commit/6c4fa7fa11237a1a2dd715a98ddbdaafe4ec632e))
* update documentation and setup for GitHub Pages ([fbe8a79](https://github.com/JaegerCaiser/mrdeveloper/commit/fbe8a795d745f42874785eebe8bf61de8410304b))
* **workflows:** Melhora os workflows de CI/CD e atualiza o contrato ([488363e](https://github.com/JaegerCaiser/mrdeveloper/commit/488363e50d49e25820a81b4f23bff29cc7e350e1))


### Performance Improvements

* add intelligent caching to CI workflows ([d501df4](https://github.com/JaegerCaiser/mrdeveloper/commit/d501df4dfb2e95f02316333dae43e08a8f96ff40))


### Reverts

* remove duplicate pr-checks workflow ([93b6258](https://github.com/JaegerCaiser/mrdeveloper/commit/93b62588e2dc1b480f3a2570d6b43027741b7c23))

# [1.1.0-beta.1](https://github.com/JaegerCaiser/mrdeveloper/compare/v1.0.3...v1.1.0-beta.1) (2025-11-03)


### Bug Fixes

* add contents write permission to delete merged branches workflow ([57f2e07](https://github.com/JaegerCaiser/mrdeveloper/commit/57f2e07d00dfd93d5f8aaa39a753ce9380560d69))
* add pnpm setup step to develop workflow ([e7d2efb](https://github.com/JaegerCaiser/mrdeveloper/commit/e7d2efb35d382983e02170246a54692c6d88622d))
* adiciona dependências de teste nos jobs de deploy ([f897087](https://github.com/JaegerCaiser/mrdeveloper/commit/f89708776fe506d61cea3e537c3f0a7504ee7c16))
* **animated-background:** hoist computeConfig, ensure resize uses CSS pixels and fix init order ([7de9b14](https://github.com/JaegerCaiser/mrdeveloper/commit/7de9b147d9c719dbc7085089008a6a0fc2c7ae65))
* capitalize environment names in workflows ([52c4d52](https://github.com/JaegerCaiser/mrdeveloper/commit/52c4d523abc0ca3f4cdca4a0a6b585906e7fc0e8))
* correct cache ordering in all GitHub Actions workflows ([9855442](https://github.com/JaegerCaiser/mrdeveloper/commit/98554429991caa4516ebe35b41af5a5ab948ec51))
* correct cache ordering in all GitHub Actions workflows ([7395deb](https://github.com/JaegerCaiser/mrdeveloper/commit/7395deb5fa5f3a2df5d5efb062d5441532c8a1a5))
* correct error logs upload condition in all workflows ([1450260](https://github.com/JaegerCaiser/mrdeveloper/commit/1450260725047ca9a3e76457af5e8ed02463fe5d))
* correct YAML syntax in production workflow ([5156f1d](https://github.com/JaegerCaiser/mrdeveloper/commit/5156f1decd36aaaf70d1007c32c4fc4b311224c8))
* corrige chamada de workflow reutilizável em steps ([66f09ee](https://github.com/JaegerCaiser/mrdeveloper/commit/66f09ee37efa30ca54607e3cbe6f5dc5f440ae2c))
* corrige sintaxe e padroniza workflows CI/CD ([531eb6d](https://github.com/JaegerCaiser/mrdeveloper/commit/531eb6dac13241a2b299d124849af3403256606c))
* desabilita ESLint plugin no build para compatibilidade com react-scripts ([248e889](https://github.com/JaegerCaiser/mrdeveloper/commit/248e889375b23d3781116255de6c59832a029369))
* fix cache positioning in GitHub Actions workflows ([4fc2edc](https://github.com/JaegerCaiser/mrdeveloper/commit/4fc2edc39c6a96167921aeab6807ce7d4a8faef1))
* fix cache positioning in GitHub Actions workflows ([67043de](https://github.com/JaegerCaiser/mrdeveloper/commit/67043dec361b0deec1d446e97ec56c29f79cfd90))
* fix cache warnings and improve error logging in workflows ([6a29a05](https://github.com/JaegerCaiser/mrdeveloper/commit/6a29a056ae7b7e3dc0a743bfb7fca7e98c191b92))
* improve error log collection by uploading artifacts from failing jobs ([fa0515e](https://github.com/JaegerCaiser/mrdeveloper/commit/fa0515e8ed6cd461dfa30ef5376387102594562e))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([53e82c6](https://github.com/JaegerCaiser/mrdeveloper/commit/53e82c63bfef5f62991659586fb23f1c54d1e0f8))
* move Vercel CLI cache after first CLI usage to prevent path validation errors ([3f95685](https://github.com/JaegerCaiser/mrdeveloper/commit/3f95685413633ef871886c027c01b37a3f76a0f7))
* **prebuild:** avoid running TS loader in CI; use node wrapper + ts-node/esm locally ([e4bdb50](https://github.com/JaegerCaiser/mrdeveloper/commit/e4bdb506773da4a7552f1996d4132ccd5892e5dc))
* remove environment flag from vercel pull for develop workflow ([d2765dc](https://github.com/JaegerCaiser/mrdeveloper/commit/d2765dc903bd8a23cba3c1329c2b9c14c36e904d))
* resolve cache warning by moving cache step after dependency installation ([4aebfb0](https://github.com/JaegerCaiser/mrdeveloper/commit/4aebfb04cac943cdcdc09508d0f4e7298f46d9d0))
* resolve cache warning by moving cache step after dependency installation ([ddfbecc](https://github.com/JaegerCaiser/mrdeveloper/commit/ddfbecc568109e6dc7aa8df08e2bd8c3a20f0a4c))
* resolve prebuild script issues for CI and local development ([b0e74f9](https://github.com/JaegerCaiser/mrdeveloper/commit/b0e74f92730f32d45d68644971febccbdd657c66))
* secrets corrigidos ([2627aa4](https://github.com/JaegerCaiser/mrdeveloper/commit/2627aa4cd7f348e6b3e4d08948e71074dae360a4))
* Tag creation only on production deploy (main branch) ([b2d18fb](https://github.com/JaegerCaiser/mrdeveloper/commit/b2d18fb4966a1997a77b88d18313114303c7d670))
* update develop workflow job names for consistent status checks ([16b63f3](https://github.com/JaegerCaiser/mrdeveloper/commit/16b63f398e8256619ff9935a0e466e0ef4ca71ec))
* update git push authentication in preview workflow ([acd34e1](https://github.com/JaegerCaiser/mrdeveloper/commit/acd34e19ded9d9f831070f8e3f129220a33ad7df))
* update preview workflow configuration ([583a27b](https://github.com/JaegerCaiser/mrdeveloper/commit/583a27becb349e5e98fe8588c13954cb3bb59364))
* update preview workflow formatting ([039fc2a](https://github.com/JaegerCaiser/mrdeveloper/commit/039fc2acadadbc6bee1d4d29a0a7ed6e9bf5dcf2))
* update preview workflow permissions and formatting ([edb37f5](https://github.com/JaegerCaiser/mrdeveloper/commit/edb37f5ef93a820f7b413b78c3332520831772ce))
* update reusable Vercel deploy workflow ([c210f1a](https://github.com/JaegerCaiser/mrdeveloper/commit/c210f1af63929c68d677c20d5041cd3a7f63b555))


### Features

* add error logs upload job to all CI workflows ([6eb24ea](https://github.com/JaegerCaiser/mrdeveloper/commit/6eb24ea7f9e43c76503af1d392da4982f56a78db))
* add error logs upload job to all CI workflows ([bfe7227](https://github.com/JaegerCaiser/mrdeveloper/commit/bfe72278620939d132fb94a5dc55dbdff363c3fc))
* add pr-checks workflow for required status checks in PRs ([d4813e1](https://github.com/JaegerCaiser/mrdeveloper/commit/d4813e15fb3b7d18cc28036b5f8f021103e1836c))
* add Vercel Analytics integration ([d034ff4](https://github.com/JaegerCaiser/mrdeveloper/commit/d034ff4925db78a205fa57da1fef8ad16dca988e))
* adiciona animação de scroll contínuo na imagem de perfil ([be6f5e3](https://github.com/JaegerCaiser/mrdeveloper/commit/be6f5e38a7b6aa3e51d953b6e267ea572b70e1a0))
* adiciona workflow para deletar branches após merge ([703b4ba](https://github.com/JaegerCaiser/mrdeveloper/commit/703b4ba902d20293313fb9668cbedc763bf0a947))
* ajusta e otimiza animação de scroll da imagem de perfil ([058b4ff](https://github.com/JaegerCaiser/mrdeveloper/commit/058b4ff6c209c22e1fe2a903680906520b436e6b))
* convert all CSS to SCSS and fix layout issues ([0635a7b](https://github.com/JaegerCaiser/mrdeveloper/commit/0635a7be87efb158de2a219822d2d477b9b55491))
* implement dummy-pass strategy to prevent infinite loop in beta-release tagging ([efc534d](https://github.com/JaegerCaiser/mrdeveloper/commit/efc534d0d4b9a1d75640b272af658c73c33b6207))
* improve GitHub Actions workflows ([82fa271](https://github.com/JaegerCaiser/mrdeveloper/commit/82fa2719065ebb66dc6d7f24d8f808216c0f3a43))
* install and configure ESLint ([7b65d89](https://github.com/JaegerCaiser/mrdeveloper/commit/7b65d8951cac39c40dc2a34afc4a5432d04df829))
* Melhoria no reporte de status do deploy de preview Vercel ([5f27559](https://github.com/JaegerCaiser/mrdeveloper/commit/5f2755923287a491ca5003261b44fed4e24a81b8))
* Melhoria no reporte de status do deploy de preview Vercel ([a879928](https://github.com/JaegerCaiser/mrdeveloper/commit/a879928e6ada5a11f557342df9dc3c2cfcc6ed91))
* Remove personal interests from about section ([#19](https://github.com/JaegerCaiser/mrdeveloper/issues/19)) ([79ec672](https://github.com/JaegerCaiser/mrdeveloper/commit/79ec672c8e352a6c52f2463c72693f3ca9434fc7))
* Resolve profile animation issues and add fadeIn effect ([#10](https://github.com/JaegerCaiser/mrdeveloper/issues/10)) ([8d27785](https://github.com/JaegerCaiser/mrdeveloper/commit/8d2778545b524cdf546cddfbcb69e851cf74a11f))
* **seo:** improve on-page SEO and crawlability ([#20](https://github.com/JaegerCaiser/mrdeveloper/issues/20)) ([0600e56](https://github.com/JaegerCaiser/mrdeveloper/commit/0600e566c09012f9186b6ad5cfcdf1786274a4d2))
* update deployment workflows to bobheadxi/deployments v1.5.0 ([3c307cd](https://github.com/JaegerCaiser/mrdeveloper/commit/3c307cd1f7c857cc9221ccf51c328a2bc6507ed4))
* Update deployment workflows to use bobheadxi/deployments action ([6c4fa7f](https://github.com/JaegerCaiser/mrdeveloper/commit/6c4fa7fa11237a1a2dd715a98ddbdaafe4ec632e))
* **workflows:** Melhora os workflows de CI/CD e atualiza o contrato ([488363e](https://github.com/JaegerCaiser/mrdeveloper/commit/488363e50d49e25820a81b4f23bff29cc7e350e1))


### Performance Improvements

* add intelligent caching to CI workflows ([d501df4](https://github.com/JaegerCaiser/mrdeveloper/commit/d501df4dfb2e95f02316333dae43e08a8f96ff40))


### Reverts

* remove duplicate pr-checks workflow ([93b6258](https://github.com/JaegerCaiser/mrdeveloper/commit/93b62588e2dc1b480f3a2570d6b43027741b7c23))
