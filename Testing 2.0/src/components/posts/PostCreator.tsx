import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  Facebook,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Link2,
  Smile,
  Twitter,
  Video,
  X,
  File,
  Plus
} from "lucide-react";
import { useState, useRef } from "react";

// Types
type Platform = 'facebook' | 'twitter' | 'instagram' | 'linkedin';
type MediaItem = {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
};

// Platform Configuration Component
const PlatformSelector = ({ 
  selectedPlatforms, 
  togglePlatform 
}: { 
  selectedPlatforms: Platform[], 
  togglePlatform: (platform: Platform) => void 
}) => {
  const platforms: { id: Platform; icon: JSX.Element; name: string }[] = [
    { id: 'facebook', icon: <Facebook size={18} />, name: 'Facebook' },
    { id: 'twitter', icon: <Twitter size={18} />, name: 'Twitter' },
    { id: 'instagram', icon: <Instagram size={18} />, name: 'Instagram' },
    { id: 'linkedin', icon: <Linkedin size={18} />, name: 'LinkedIn' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {platforms.map(platform => (
        <Button
          key={platform.id}
          variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
          className="gap-2"
          onClick={() => togglePlatform(platform.id)}
        >
          {platform.icon}
          <span>{platform.name}</span>
        </Button>
      ))}
    </div>
  );
};

// Content Editor Component
const ContentEditor = ({ 
  content, 
  setContent, 
  onAiText, 
  onAiImage 
}: { 
  content: string, 
  setContent: (text: string) => void, 
  onAiText: () => void, 
  onAiImage: () => void 
}) => {
  return (
    <div>
      <textarea
        className="w-full border rounded-lg p-3 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="What would you like to share?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-2 mt-2">
        <Button variant="secondary" onClick={onAiText} className="gap-2">
          ✍️ AI Text
        </Button>
        <Button variant="secondary" onClick={onAiImage} className="gap-2">
          🎨 AI Image
        </Button>
        <Button variant="outline" className="gap-2">
          ⋯ More
        </Button>
      </div>
    </div>
  );
};

// Preview Component
const PostPreview = ({ content, mediaItems }: { content: string, mediaItems: MediaItem[] }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="text-sm font-medium mb-2">Preview</div>
      <div className="bg-gray-50 rounded-lg p-3 min-h-[100px]">
        {content ? content : <span className="text-muted-foreground">Your post preview will appear here</span>}
      </div>
      
      {mediaItems.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {mediaItems.map(item => (
            <div key={item.id} className="relative rounded-md overflow-hidden border">
              {item.type === 'image' && (
                <img src={item.url} alt={item.name} className="w-full h-40 object-cover" />
              )}
              {item.type === 'video' && (
                <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
                  <Video className="h-10 w-10 text-gray-400" />
                  <span className="ml-2 text-sm">{item.name}</span>
                </div>
              )}
              {item.type === 'file' && (
                <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
                  <File className="h-10 w-10 text-gray-400" />
                  <span className="ml-2 text-sm">{item.name}</span>
                </div>
              )}
              <button 
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1"
                onClick={() => {/* Remove item functionality */}}
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ 
  title, 
  isOpen, 
  onClose, 
  children 
}: { 
  title: string, 
  isOpen: boolean, 
  onClose: () => void, 
  children: React.ReactNode 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// AI Text Modal Content
const AiTextModalContent = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  onClose 
}: { 
  prompt: string, 
  setPrompt: (text: string) => void, 
  onGenerate: () => void, 
  onClose: () => void 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate();
    setIsGenerating(false);
  };
  
  return (
    <>
      <textarea
        className="w-full border rounded-lg p-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your prompt for AI Text generation"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleGenerate} disabled={isGenerating || !prompt}>
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
    </>
  );
};

// AI Image Modal Content
const AiImageModalContent = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  onClose 
}: { 
  prompt: string, 
  setPrompt: (text: string) => void, 
  onGenerate: () => void, 
  onClose: () => void 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate();
    setIsGenerating(false);
  };
  
  return (
    <>
      <textarea
        className="w-full border rounded-lg p-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your prompt for AI Image generation using FLUX.1-dev"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleGenerate} disabled={isGenerating || !prompt}>
          {isGenerating ? "Generating..." : "Generate Image"}
        </Button>
      </div>
    </>
  );
};

// Media Upload Modal
const MediaUploadModal = ({ 
  isOpen, 
  onClose, 
  onUpload 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onUpload: (files: File[]) => void 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleUpload = () => {
    onUpload(selectedFiles);
    setSelectedFiles([]);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <Modal title="Upload Media" isOpen={isOpen} onClose={onClose}>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fileInputRef.current?.click()}
          >
            Select Files
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={handleFileChange} 
          />
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
          <div className="max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center py-1">
                <div className="w-8">
                  {file.type.startsWith('image/') ? (
                    <ImageIcon size={18} />
                  ) : file.type.startsWith('video/') ? (
                    <Video size={18} />
                  ) : (
                    <File size={18} />
                  )}
                </div>
                <span className="text-sm truncate">{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
          Upload
        </Button>
      </div>
    </Modal>
  );
};

// Main Post Creator Component
const PostCreator = () => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showAiTextModal, setShowAiTextModal] = useState(false);
  const [showAiImageModal, setShowAiImageModal] = useState(false);
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);
  const [aiTextPrompt, setAiTextPrompt] = useState('');
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Mock Gemini text generation API call
  
  const generateAiText = async () => {
    setIsGeneratingText(true);
    try {
      // Gemini API implementation using the gemini-2.0-flash model
      const apiKey = "AIzaSyBkgVFMxmF6UfDzzzlEs6jVyY1j8HGnyjA";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: aiTextPrompt
            }]
          }]
        })
      });
      
      const data = await response.json();
      
      // Extract the generated text from the response
      let generatedText = '';
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && data.candidates[0].content.parts) {
        generatedText = data.candidates[0].content.parts
          .filter(part => part.text)
          .map(part => part.text)
          .join('\n');
        
        // You can optionally keep the format showing it was AI-generated
        generatedText = `\n\n${generatedText}`;
      } else if (data.error) {
        throw new Error(data.error.message || 'Error generating text with Gemini');
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }
      
      setContent(prev => prev ? `${prev}\n\n${generatedText}` : generatedText);
      setShowAiTextModal(false);
      setAiTextPrompt('');
    } catch (error) {
      console.error('Error generating text:', error);
      // Optionally show error to user
      alert(`Failed to generate text: ${error.message}`);
    } finally {
      setIsGeneratingText(false);
    }
  };

  // Mock FLUX.1-dev image generation API call
  const generateAiImage = async () => {
    setIsGeneratingImage(true);
    try {
      // Replace with actual Black Forest Labs FLUX.1-dev API implementation
      // const response = await fetch('https://api.blackforestlabs.com/flux/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt: aiImagePrompt })
      // });
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - using placeholder instead of real API
      const newMediaItem: MediaItem = {
        id: `img-${Date.now()}`,
        type: 'image',
        url: `/api/placeholder/640/360`,
        name: `AI Image: ${aiImagePrompt.substring(0, 20)}...`
      };
      
      setMediaItems(prev => [...prev, newMediaItem]);
      setShowAiImageModal(false);
      setAiImagePrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle file uploads
  const handleFileUpload = (files: File[]) => {
    const newMediaItems: MediaItem[] = files.map(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      return {
        id: `upload-${Date.now()}-${file.name}`,
        type: isImage ? 'image' : isVideo ? 'video' : 'file',
        // In a real app, you would upload the file and get a URL
        url: isImage ? URL.createObjectURL(file) : '',
        name: file.name
      };
    });
    
    setMediaItems(prev => [...prev, ...newMediaItems]);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <PlatformSelector 
        selectedPlatforms={selectedPlatforms} 
        togglePlatform={togglePlatform} 
      />
      
      <div className="mb-4">
        <ContentEditor
          content={content}
          setContent={setContent}
          onAiText={() => setShowAiTextModal(true)}
          onAiImage={() => setShowAiImageModal(true)}
        />
      </div>

      <PostPreview content={content} mediaItems={mediaItems} />

      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setShowMediaUploadModal(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Link2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            <span>Save Draft</span>
          </Button>
          <Button 
            className="gap-2" 
            disabled={content.length === 0 && mediaItems.length === 0 || selectedPlatforms.length === 0}
          >
            Post Now
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        title="AI Text Generation" 
        isOpen={showAiTextModal} 
        onClose={() => setShowAiTextModal(false)}
      >
        <AiTextModalContent
          prompt={aiTextPrompt}
          setPrompt={setAiTextPrompt}
          onGenerate={generateAiText}
          onClose={() => setShowAiTextModal(false)}
        />
      </Modal>

      <Modal 
        title="AI Image Generation" 
        isOpen={showAiImageModal} 
        onClose={() => setShowAiImageModal(false)}
      >
        <AiImageModalContent
          prompt={aiImagePrompt}
          setPrompt={setAiImagePrompt}
          onGenerate={generateAiImage}
          onClose={() => setShowAiImageModal(false)}
        />
      </Modal>

      <MediaUploadModal
        isOpen={showMediaUploadModal}
        onClose={() => setShowMediaUploadModal(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
};

export default PostCreator;