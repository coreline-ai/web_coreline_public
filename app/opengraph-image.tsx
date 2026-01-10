
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Coreline | Engineering Studio';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        letterSpacing: '-0.05em',
                    }}
                >
                    <span style={{ color: '#FFD600', marginRight: 20 }}>CORE</span>LINE
                </div>
                <div
                    style={{
                        fontSize: 48,
                        marginTop: 40,
                        fontWeight: 500,
                        color: '#A0A0A0',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    Engineering Studio
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
