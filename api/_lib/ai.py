
import os
from zhipuai import ZhipuAI

# Initialize Client safely
try:
    _api_key = os.environ.get("GLM_API_KEY")
    _base_url = os.environ.get("GLM_BASE_URL")  # Support custom Base URL
    
    if _base_url:
        client = ZhipuAI(api_key=_api_key, base_url=_base_url)
    else:
        client = ZhipuAI(api_key=_api_key)
except:
    client = None

def generate_summary(text: str) -> str:
    """
    Generate a 3-line summary of the input text using GLM.
    Returns None if API key is missing or error occurs.
    """
    api_key = os.environ.get("GLM_API_KEY")
    if not api_key:
        print("⚠️ GLM_API_KEY not found. Skipping summarization.")
        return None

    if not text:
         return None
         
    if len(text) < 20: 
        return text 

    try:
        # Re-init client if needed (in case env var set late)
        base_url = os.environ.get("GLM_BASE_URL")
        if base_url:
            local_client = ZhipuAI(api_key=api_key, base_url=base_url)
        else:
            local_client = ZhipuAI(api_key=api_key)
        
        # Get model from env or default to generic glm-4
        model_name = os.environ.get("GLM_MODEL", "glm-4-flash")
        
        response = local_client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Summarize the following content into 3 concise sentences in Korean:\n\n{text[:3000]}"} 
            ],
            top_p=0.7,
            temperature=0.7,
            max_tokens=1024,
            timeout=float(os.environ.get("GLM_TIMEOUT_SECONDS", 30))
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"❌ GLM API Error: {str(e)}")
        return None
