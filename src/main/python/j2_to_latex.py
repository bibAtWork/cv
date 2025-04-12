import json
import os
import re
from jinja2 import Template, Environment, FileSystemLoader

## Util functions

def bullet_to_itemize(text):
    if not text or '*' not in text:
        return text
    lines = [line.strip() for line in text.split('*') if line.strip()]
    if not lines:
        return text
    items = "\n".join(f"  \\item {line}" for line in lines)
    return f"\\begin{{itemize}}\n{items}\n\\end{{itemize}}"

def latex_format_special_chars(value):
    # Bold every segment ending with colon
    value = re.sub(r'([^\s][^:\n]*?):', r'\\textbf{\1:}', value)

    value = value.replace('\n\n', r'\\[1em]')  # Convert \n to LaTeX newlines
    value = value.replace('&', r'\&')  # Escape special chars
    value = value.replace('\n', r'\\')  # Convert \n to LaTeX newlines

    value = bullet_to_itemize(value)

    return value



## J2 transformation
# Set up Jinja environment
env = Environment(loader=FileSystemLoader('.'))
env.filters['latexify'] = latex_format_special_chars

# Get the absolute path of the script's directory
base_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(base_dir, '..'))

# Load JSON data
json_path = os.path.join(project_root, 'resources', 'resume.json')
with open(json_path, 'r') as file:
    data = json.load(file)

# Load LaTeX template
template_path = os.path.join(project_root, 'python','office-rover.tex.j2')
with open(template_path, 'r') as file:
    template = env.from_string(file.read())

# Render LaTeX document
rendered_tex = template.render(data)

# Output the result
output_path = os.path.join(project_root, 'latex', 'output.tex')
with open(output_path, 'w') as file:
    file.write(rendered_tex)



