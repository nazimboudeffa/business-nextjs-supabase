"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Loader2, Code } from "lucide-react"

type AnalysisResult = {
    titleKeywords: string[];
    descriptionKeywords: string[];
    numLines: number;
    numCharacters: number;
}

export default function Analyzer() {

    const [url, setUrl] = useState<string>('')
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
      
    function analyseTitle(doc: Document): string[] {
    const title = doc.querySelector("title")?.textContent;
    return title?.split(" ")?? [];
    }
    
    function analyseDescription(doc: Document): string[] {
    const description = doc.querySelector("meta[name='description']")?.getAttribute('content');
    return description?.split(" ")?? [];
    }
    
    function analyseHTMLStructure(html: string): { numLines: number; numCharacters: number } {
    const codeHTML = html.replace(/\s/g, "");
    const codeLines = codeHTML.split("\n");
    return {
        numLines: codeLines.length,
        numCharacters: codeHTML.length,
    };
    }
    
    async function analyseSEO(url: string): Promise<AnalysisResult> {
    let html = ''
    // Fetch the HTML
    try {
        setIsLoading(true)
        const response = await fetch('/api/seo', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const { data } = await response.json();
        html = data
        setIsLoading(false)
    } catch (error) {
        console.error(error);
    };

    // Structure the HTML code
    const document = new DOMParser().parseFromString(html, 'text/html');

    // Analyse the title
    const titleKeywords = analyseTitle(document);

    // Analyse the description
    const descriptionKeywords = analyseDescription(document);
    
    // Analyse the HTML structure
    const { numLines, numCharacters } = analyseHTMLStructure(html);

    setAnalysisResult({
        titleKeywords,
        descriptionKeywords,
        numLines,
        numCharacters,
        });
    return {
        titleKeywords,
        descriptionKeywords,
        numLines,
        numCharacters,
        };
    }
    const handleClick = (url: string) => {
        if (!url) {
            return;
        }
        analyseSEO(url);
    }
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
                <Input type="text" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button type="submit" onClick={()=>handleClick(url)} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Code className="mr-2 h-4 w-4" />
                    )}{"Analyse!"}
                </Button>
            </div>
            {analysisResult && (
                <div className="mt-3">
                    <div>Title Keywords: {analysisResult.titleKeywords.join(", ")}</div>
                    <div>Description Keywords: {analysisResult.descriptionKeywords.join(", ")}</div>
                    <div>Lines : {analysisResult.numLines}</div>
                    <div>Characters : {analysisResult.numCharacters}</div>
                </div>
            )}
        </div>
    )
}