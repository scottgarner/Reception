precision mediump float;

varying vec2 v_texCoord;
uniform float time;

float rand(vec2 co) {
     return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{

     float amount = .2;
     
     float snow = rand(v_texCoord * time )*amount;

     vec3 scan = vec3(
          sin( (v_texCoord.y * 800. ) - 80. + (time / 100.)) * .2,
          sin( (v_texCoord.y * 800. ) + (time / 100.)) * .2,
          sin( (v_texCoord.y * 800. ) + 80. + (time / 100.)) * .2
     );

     css_ColorMatrix = mat4(
          .8 + scan.r,
          0.0,
          0.0,
          0.0,

          0.0,
          .8+ scan.g,
          0.0,
          0.0,

          0.0,
          0.0,
          .8 + scan.b,
          0.0,

          0.0, 0.0, 0.0, 1.0
     );

     css_MixColor = vec4(snow, snow, snow, 1.0);
}


