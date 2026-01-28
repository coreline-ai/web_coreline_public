
import sys
import os
import traceback
from zhipuai import ZhipuAI
from dotenv import load_dotenv

sys.path.append(os.getcwd())
load_dotenv()


# Validating .env values


def test_manual():
    print("🤖 Testing GLM Direct Connection...")
    api_key = os.environ.get("GLM_API_KEY")
    base_url = os.environ.get("GLM_BASE_URL")
    model = os.environ.get("GLM_MODEL", "glm-4")
    
    print(f"📍 Base URL: {base_url}")
    print(f"🧠 Model: {model}")
    print(f"🔑 Key: {api_key[:5]}..." if api_key else "❌ No Key")

    try:
        client = ZhipuAI(api_key=api_key, base_url=base_url)
        print("🚀 Sending request...")
        
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": "Hello! Say hi."}
            ],
            stream=False,
            timeout=30.0
        )
        
        print("✅ Response received:")
        print(response)
        if response.choices:
            print(f"💬 Content: {response.choices[0].message.content}")

    except Exception:
        print("❌ Exception occurred:")
        traceback.print_exc()

if __name__ == "__main__":
    test_manual()
