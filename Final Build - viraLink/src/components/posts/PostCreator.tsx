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
  Plus,
  Sparkles
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Types
type Platform = 'facebook' | 'twitter' | 'instagram' | 'linkedin';
type MediaItem = {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  name: string;
};

type TextPromptForm = {
  platform: string;
  tone: string;
  characterLimit: string;
  additionalInstructions: string;
};

type ImagePromptForm = {
  purpose: string;
  designStyle: string;
  brandName: string;
  elements: string;
  platform: string;
  colorPalette: string;
  additionalInstructions: string;
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
          <Sparkles size={16} /> AI Text
        </Button>
        <Button variant="secondary" onClick={onAiImage} className="gap-2">
          <Sparkles size={16} /> AI Image
        </Button>
        <Button variant="outline" className="gap-2">
          ⋯ More
        </Button>
      </div>
    </div>
  );
};

// Preview Component with formatted content
const PostPreview = ({ 
  content, 
  mediaItems, 
  isGenerating 
}: { 
  content: string, 
  mediaItems: MediaItem[], 
  isGenerating: boolean 
}) => {
  const formattedContent = content.split('\n').map((line, index) => (
    <p key={index} className={line.startsWith('*') ? "font-bold" : ""}>{line}</p>
  ));

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="text-sm font-medium mb-2">Preview</div>
      <div className="bg-gray-50 rounded-lg p-3 min-h-[100px]">
        {isGenerating ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-muted-foreground">Generating content...</span>
          </div>
        ) : content ? (
          <div className="prose prose-sm max-w-none">
            {formattedContent}
          </div>
        ) : (
          <span className="text-muted-foreground">Your post preview will appear here</span>
        )}
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
      <div className="bg-white rounded-lg p-4 w-full max-w-md max-h-screen overflow-y-auto">
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

// Form field component
const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  placeholder = "",
  options = [] 
}: { 
  label: string, 
  name: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, 
  type?: string, 
  placeholder?: string,
  options?: { value: string, label: string }[] 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          rows={3}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select an option</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

// AI Text Modal Content with form fields
const AiTextModalContent = ({ 
  formData,
  setFormData,
  onGenerate, 
  onClose 
}: { 
  formData: TextPromptForm,
  setFormData: (data: TextPromptForm) => void,
  onGenerate: () => void, 
  onClose: () => void 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate();
    setIsGenerating(false);
  };

  const toneOptions = [
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "motivational", label: "Motivational" },
    { value: "funny", label: "Funny" },
    { value: "informative", label: "Informative" },
    { value: "promotional", label: "Promotional" }
  ];
  
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Fill out the form below to generate a social media post tailored to your needs.
      </p>
      
      <FormField
        label="Platform"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        placeholder="Instagram, LinkedIn, Twitter, or Facebook"
      />
      
      <FormField
        label="Tone"
        name="tone"
        value={formData.tone}
        onChange={handleChange}
        type="select"
        options={toneOptions}
      />
      
      <FormField
        label="Character Limit (optional)"
        name="characterLimit"
        value={formData.characterLimit}
        onChange={handleChange}
        placeholder="e.g., 280 for Twitter"
      />
      
      <FormField
        label="Additional Instructions"
        name="additionalInstructions"
        value={formData.additionalInstructions}
        onChange={handleChange}
        type="textarea"
        placeholder="Any specific details or topics you want to include"
      />
      
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleGenerate} disabled={isGenerating || !formData.platform || !formData.tone}>
          {isGenerating ? "Generating..." : "Generate Post"}
        </Button>
      </div>
    </>
  );
};

// AI Image Modal Content with form fields
const AiImageModalContent = ({ 
  formData,
  setFormData,
  onGenerate, 
  onClose 
}: { 
  formData: ImagePromptForm,
  setFormData: (data: ImagePromptForm) => void,
  onGenerate: () => void, 
  onClose: () => void 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate();
    setIsGenerating(false);
  };

  const designStyleOptions = [
    { value: "modern", label: "Modern" },
    { value: "minimal", label: "Minimal" },
    { value: "retro", label: "Retro" },
    { value: "colorful", label: "Colorful" },
    { value: "elegant", label: "Elegant" },
    { value: "bold", label: "Bold" }
  ];
  
  const platformOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter" }
  ];
  
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Fill out the form below to generate a custom social media image.
      </p>
      
      <FormField
        label="Purpose"
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        placeholder="e.g., business launch, promo, webinar, etc."
      />
      
      <FormField
        label="Design Style"
        name="designStyle"
        value={formData.designStyle}
        onChange={handleChange}
        type="select"
        options={designStyleOptions}
      />
      
      <FormField
        label="Brand Name"
        name="brandName"
        value={formData.brandName}
        onChange={handleChange}
        placeholder="Your brand or company name"
      />
      
      <FormField
        label="Key Elements"
        name="elements"
        value={formData.elements}
        onChange={handleChange}
        type="textarea"
        placeholder="logo, tagline, product image, date/time, etc."
      />
      
      <FormField
        label="Target Platform"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        type="select"
        options={platformOptions}
      />
      
      <FormField
        label="Color Palette"
        name="colorPalette"
        value={formData.colorPalette}
        onChange={handleChange}
        placeholder="e.g., blue and white, pastel, neon, etc."
      />
      
      <FormField
        label="Additional Instructions"
        name="additionalInstructions"
        value={formData.additionalInstructions}
        onChange={handleChange}
        type="textarea"
        placeholder="Any other specific details or requirements"
      />
      
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleGenerate} disabled={isGenerating || !formData.purpose || !formData.designStyle || !formData.brandName}>
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
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  // Form state for text generation
  const [textFormData, setTextFormData] = useState<TextPromptForm>({
    platform: '',
    tone: '',
    characterLimit: '',
    additionalInstructions: ''
  });
  
  // Form state for image generation
  const [imageFormData, setImageFormData] = useState<ImagePromptForm>({
    purpose: '',
    designStyle: '',
    brandName: '',
    elements: '',
    platform: '',
    colorPalette: '',
    additionalInstructions: ''
  });

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Generate AI Text based on form data
  const generateAiText = async () => {
    setIsGeneratingText(true);
    try {
      // Build prompt from form data
      const prompt = `
Create a social media post for ${textFormData.platform} 
with a ${textFormData.tone} tone.

${textFormData.characterLimit ? `Keep it under ${textFormData.characterLimit} characters.` : ''}

It should include:
- A compelling hook
- A clear message
- A strong call to action

Additional instructions: ${textFormData.additionalInstructions || 'Use relevant hashtags and emojis to enhance reach and engagement'}
      `.trim();
      
      // Gemini API implementation using the gemini-2.0-flash model
      const apiKey = "AIzaSyBlTjGW9w3vHvr_esgWwyS32fjA7eYV3OU";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
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
        
        // Format the response nicely
        generatedText = `*AI Generated ${textFormData.platform} Post (${textFormData.tone} tone):*\n\n${generatedText}`;
      } else if (data.error) {
        throw new Error(data.error.message || 'Error generating text with Gemini');
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }
      
      setContent(prev => prev ? `${prev}\n\n${generatedText}` : generatedText);
      setShowAiTextModal(false);
      
      // Reset form data
      setTextFormData({
        platform: '',
        tone: '',
        characterLimit: '',
        additionalInstructions: ''
      });
    } catch (error) {
      console.error('Error generating text:', error);
      // Optionally show error to user
      alert(`Failed to generate text: ${error.message}`);
    } finally {
      setIsGeneratingText(false);
    }
  };

  // Generate AI Image based on form data
  const generateAiImage = async () => {
    setIsGeneratingImage(true);
    try {
      // Build prompt from form data
      const prompt = `
Create a high-quality, eye-catching social media poster for ${imageFormData.purpose}.
The design should be ${imageFormData.designStyle}, include the brand name '${imageFormData.brandName}',
and feature key elements like ${imageFormData.elements || 'logo, product image, and compelling text'}.
It should be optimized for ${imageFormData.platform}, with appropriate dimensions and bold typography.
Use a ${imageFormData.colorPalette || 'vibrant and professional'} color palette and ensure the text is clear and readable.
${imageFormData.additionalInstructions ? `Additional instructions: ${imageFormData.additionalInstructions}` : ''}
      `.trim();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - using placeholder instead of real API
      const newMediaItem: MediaItem = {
        id: `img-${Date.now()}`,
        type: 'image',
        url: `/api/placeholder/640/360`,
        name: `${imageFormData.designStyle} ${imageFormData.purpose} for ${imageFormData.brandName}`
      };
      
      setMediaItems(prev => [...prev, newMediaItem]);
      setShowAiImageModal(false);
      
      // Reset form data
      setImageFormData({
        purpose: '',
        designStyle: '',
        brandName: '',
        elements: '',
        platform: '',
        colorPalette: '',
        additionalInstructions: ''
      });
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
      <h2 className="text-xl font-semibold mb-4">Create Social Media Post</h2>
      
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

      <PostPreview 
        content={content} 
        mediaItems={mediaItems}
        isGenerating={isGeneratingText || isGeneratingImage}
      />

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
          formData={textFormData}
          setFormData={setTextFormData}
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
          formData={imageFormData}
          setFormData={setImageFormData}
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