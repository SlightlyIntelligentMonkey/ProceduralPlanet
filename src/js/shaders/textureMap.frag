import noise from 'glsl-noise/classic/4d'

varying vec2 vUv;

uniform sampler2D colorMap;
uniform sampler2D xIndexMap;
uniform sampler2D yIndexMap;
uniform sampler2D temperatureMap;
uniform float iceCutoff;   //this is bugged for some reason I can't understand

void main() {
	float x = vUv.x;
	float y = vUv.y;

	float temp = texture2D(temperatureMap, vec2(x,y)).r;

	float n1 = texture2D(xIndexMap, vec2(x, y)).r;
	float n2 = texture2D(yIndexMap, vec2(x, y)).r;

	vec4 color = texture2D(colorMap, vec2(n1, n2));

	if(temp < 0.1) //temporary fix
		gl_FragColor = vec4(1.0);
	else
		gl_FragColor = color;
}
