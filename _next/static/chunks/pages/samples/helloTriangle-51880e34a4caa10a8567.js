_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[14],{Y5Gk:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/samples/helloTriangle",function(){return t("zM6r")}])},zM6r:function(e,n,t){"use strict";t.r(n);var r=t("o0o1"),a=t.n(r),o=t("HaE+"),i=t("SoUo"),s=t("PpzT");function c(){return(c=Object(o.a)(a.a.mark((function e(n,t){var r,o,i,c,u,m,g,v;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v=function(){var e=o.createCommandEncoder(),n={colorAttachments:[{attachment:m.getCurrentTexture().createView(),loadValue:{r:0,g:0,b:0,a:1}}]},t=e.beginRenderPass(n);t.setPipeline(g),t.draw(3,1,0,0),t.endPass(),o.queue.submit([e.finish()])},e.next=3,navigator.gpu.requestAdapter();case 3:return r=e.sent,e.next=6,r.requestDevice();case 6:return o=e.sent,e.next=9,Object(s.a)();case 9:return i=e.sent,c=n.getContext("gpupresent"),u="bgra8unorm",m=c.configureSwapChain({device:o,format:u}),g=o.createRenderPipeline({vertex:{module:t?o.createShaderModule({code:d.vertex}):o.createShaderModule({code:l.vertex,transform:function(e){return i.compileGLSL(e,"vertex")}}),entryPoint:"main"},fragment:{module:t?o.createShaderModule({code:d.fragment}):o.createShaderModule({code:l.fragment,transform:function(e){return i.compileGLSL(e,"fragment")}}),entryPoint:"main",targets:[{format:u}]},primitive:{topology:"triangle-list"}}),e.abrupt("return",v);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var l={vertex:"#version 450\nconst vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));\n\nvoid main() {\n    gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);\n}\n",fragment:"#version 450\n  layout(location = 0) out vec4 outColor;\n\n  void main() {\n      outColor = vec4(1.0, 0.0, 0.0, 1.0);\n  }\n"},d={vertex:"\nlet pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5));\n\n[[stage(vertex)]]\nfn main([[builtin(vertex_index)]] VertexIndex : u32)\n     -> [[builtin(position)]] vec4<f32> {\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n",fragment:"\n[[stage(fragment)]]\nfn main() -> [[location(0)]] vec4<f32> {\n  return vec4<f32>(1.0, 0.0, 0.0, 1.0);\n}\n"},u=Object(i.c)({name:"Hello Triangle",description:"Shows rendering a basic triangle.",slug:"helloTriangle",wgslShaders:d,glslShaders:l,init:function(e,n){return c.apply(this,arguments)},source:"import { makeBasicExample } from '../../components/basicExample';\nimport glslangModule from '../../glslang';\n\nasync function init(canvas: HTMLCanvasElement, useWGSL: boolean) {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n  const glslang = await glslangModule();\n\n  const context = canvas.getContext('gpupresent');\n\n  const swapChainFormat = 'bgra8unorm';\n\n  const swapChain = context.configureSwapChain({\n    device,\n    format: swapChainFormat,\n  });\n\n  const pipeline = device.createRenderPipeline({\n    vertex: {\n      module: useWGSL\n        ? device.createShaderModule({\n            code: wgslShaders.vertex,\n          })\n        : device.createShaderModule({\n            code: glslShaders.vertex,\n            transform: (glsl) => glslang.compileGLSL(glsl, 'vertex'),\n          }),\n      entryPoint: 'main',\n    },\n    fragment: {\n      module: useWGSL\n        ? device.createShaderModule({\n            code: wgslShaders.fragment,\n          })\n        : device.createShaderModule({\n            code: glslShaders.fragment,\n            transform: (glsl) => glslang.compileGLSL(glsl, 'fragment'),\n          }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: swapChainFormat,\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n    },\n  });\n\n  function frame() {\n    const commandEncoder = device.createCommandEncoder();\n    const textureView = swapChain.getCurrentTexture().createView();\n\n    const renderPassDescriptor: GPURenderPassDescriptor = {\n      colorAttachments: [\n        {\n          attachment: textureView,\n          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n        },\n      ],\n    };\n\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.draw(3, 1, 0, 0);\n    passEncoder.endPass();\n\n    device.queue.submit([commandEncoder.finish()]);\n  }\n\n  return frame;\n}\n\nconst glslShaders = {\n  vertex: `#version 450\nconst vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));\n\nvoid main() {\n    gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);\n}\n`,\n\n  fragment: `#version 450\n  layout(location = 0) out vec4 outColor;\n\n  void main() {\n      outColor = vec4(1.0, 0.0, 0.0, 1.0);\n  }\n`,\n};\n\nconst wgslShaders = {\n  vertex: `\nlet pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5));\n\n[[stage(vertex)]]\nfn main([[builtin(vertex_index)]] VertexIndex : u32)\n     -> [[builtin(position)]] vec4<f32> {\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n`,\n  fragment: `\n[[stage(fragment)]]\nfn main() -> [[location(0)]] vec4<f32> {\n  return vec4<f32>(1.0, 0.0, 0.0, 1.0);\n}\n`,\n};\n\n// import ma from '../../components/BasicExample';\n\nconst HelloTriangle = makeBasicExample({\n  name: 'Hello Triangle',\n  description: 'Shows rendering a basic triangle.',\n  slug: 'helloTriangle',\n  wgslShaders,\n  glslShaders,\n  init,\n  source: __SOURCE__,\n});\n\nexport default HelloTriangle;\n"});n.default=u}},[["Y5Gk",0,1,4,2,3]]]);