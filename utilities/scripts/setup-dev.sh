#!/bin/bash
# setup-dev.sh
# Sets up the development environment for Choreboard

set -e

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../../" && pwd)"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section headers
section() {
  echo -e "\n${BLUE}==>${NC} ${GREEN}$1${NC}"
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Change to project root
cd "${PROJECT_ROOT}" || exit 1

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
  section "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  
  # Add Homebrew to PATH if needed
  if [[ "$SHELL" == "/bin/zsh" ]]; then
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi
fi

# Install packages from Brewfile
section "Installing Homebrew packages..."
brew bundle install

# Set up NVM
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \
  . "/opt/homebrew/opt/nvm/nvm.sh"

# Install Node.js version from .nvmrc
if [ -f ".nvmrc" ]; then
  section "Installing Node.js version from .nvmrc..."
  nvm install
  nvm use
  
  # Install global Node.js packages
  section "Installing global Node.js packages..."
  npm install -g npm@latest
  npm install -g yarn
  npm install -g pnpm
  npm install -g typescript
  npm install -g eslint
  npm install -g prettier
fi

# Set up frontend dependencies
if [ -d "frontend" ]; then
  section "Setting up frontend dependencies..."
  cd frontend
  
  # Install Node.js dependencies
  if [ -f "package.json" ]; then
    echo "Installing npm dependencies..."
    npm install
  fi
  
  # Install additional recommended packages
  echo "Installing additional frontend packages..."
  npm install @heroicons/react date-fns zustand @tanstack/react-query
  
  cd ..
fi

# Install VS Code extensions (if code command exists)
if command_exists code; then
    section "🔌 Installing VS Code extensions..."
    code --install-extension dbaeumer.vscode-eslint --force
    code --install-extension esbenp.prettier-vscode --force
    code --install-extension bradlc.vscode-tailwindcss --force
    code --install-extension GitHub.github-vscode-theme --force
    code --install-extension ms-vsliveshare.vsliveshare --force
else
    echo -e "${YELLOW}ℹ️  VS Code 'code' command not found. Skipping extensions.${NC}"
fi

# Step 1: Check GitHub CLI authentication
if command_exists gh; then
    section "🔍 Checking GitHub CLI authentication..."
    if ! gh auth status; then
        echo -e "${YELLOW}⚠️  GitHub CLI not authenticated. Run 'gh auth login' if needed${NC}"
    fi
else
    echo -e "${YELLOW}ℹ️  GitHub CLI (gh) not found. Install it for GitHub integration.${NC}"
fi

# Set up pre-commit hooks
section "Setting up Git hooks..."
if [ -d ".git" ]; then
  echo "Installing Husky..."
  npx husky install
  
  # Add pre-commit hook
  npx husky add .husky/pre-commit "npm run lint"
  
  # Make hooks executable
  chmod +x .husky/*
fi

# Final summary
section "✅ Setup Complete!"
echo -e "\nNext steps:"
echo -e "1. Install Node.js: ${YELLOW}nvm install${NC}"
echo -e "2. Install dependencies: ${YELLOW}cd frontend && npm install${NC}"
echo -e "3. Start the dev server: ${YELLOW}npm run dev${NC}"
echo -e "\nVisit ${BLUE}http://localhost:3000${NC} to view the app"

exit 0

