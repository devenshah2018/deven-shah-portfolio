"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Users,
  Award,
  Shield,
  PlayCircle,
  CheckCircle,
  BarChart3,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface AresVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const keyMetrics = [
  { icon: Users, value: "100+", label: "Active Users", color: "text-primary" },
  {
    icon: Award,
    value: "Microsoft",
    label: "Startup Program",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    value: "SOC2/OWASP",
    label: "Compliance Ready",
    color: "text-green-500",
  },
];

const features = [
  {
    name: "VSCode Extension",
    description: "Seamless Rust & TypeScript integration.",
    iconColor: "bg-blue-500",
  },
  {
    name: "SOC2 Compliance",
    description: "Automated checks & evidence gathering.",
    iconColor: "bg-green-500",
  },
  {
    name: "OWASP Standards",
    description: "Proactive vulnerability scanning.",
    iconColor: "bg-yellow-500",
  },
  {
    name: "Real-time Monitoring",
    description: "Continuous security assessment.",
    iconColor: "bg-purple-500",
  },
  {
    name: "Automated Reporting",
    description: "Comprehensive compliance documentation.",
    iconColor: "bg-red-500",
  },
  {
    name: "Team Collaboration",
    description: "Secure multi-user workspace.",
    iconColor: "bg-teal-500",
  },
];

const recognitions = [
  {
    name: "Microsoft Startup Program",
    detail:
      "Accepted into Microsoft's prestigious startup accelerator program.",
    badgeColor: "bg-blue-600 text-blue-50",
  },
  {
    name: "Buildspace S5",
    detail:
      "Selected for Buildspace Season 5 cohort, a top-tier builder community.",
    badgeColor: "bg-purple-600 text-purple-50",
  },
  {
    name: "100+ User Milestone",
    detail:
      "Rapid user adoption and positive feedback within the first 6 months.",
    badgeColor: "bg-green-600 text-green-50",
  },
];

export function AresVideoModal({ open, onOpenChange }: AresVideoModalProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${isMaximized ? "max-w-full h-full rounded-none" : "max-w-6xl max-h-[95vh]"} 
          p-0 flex flex-col transition-all duration-300 ease-in-out bg-background border-border shadow-2xl
        `}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between sticky top-0 bg-background z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Ares - Security Compliance Platform
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Automate SOC2 & OWASP Compliance for Modern Development Teams
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMaximized ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isMaximized ? "Minimize" : "Maximize"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://ares-security.com", "_blank")}
              className="hidden sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Ares Website
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {/* Video Demo Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-secondary via-background to-secondary">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-700/30 via-orange-700/30 to-yellow-700/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                    <div className="text-center text-white z-10 p-8">
                      <Shield className="h-20 w-20 mx-auto mb-6 text-red-400 drop-shadow-lg" />
                      <h3 className="text-3xl font-bold mb-3 drop-shadow-md">
                        Ares Security Platform Demo
                      </h3>
                      <p className="text-lg text-gray-200 mb-6 max-w-md mx-auto drop-shadow-sm">
                        See how Ares simplifies SOC2 & OWASP compliance for your
                        development workflow.
                      </p>
                      <Button
                        size="lg"
                        className="bg-white text-red-600 hover:bg-gray-100 font-semibold shadow-lg group-hover:scale-105 transition-transform duration-300"
                        onClick={() => alert("Link to full demo video!")}
                      >
                        <PlayCircle className="h-6 w-6 mr-2" />
                        Watch Full Demo
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-background">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Empowering Secure Development
                  </h3>
                  <p className="text-muted-foreground">
                    Ares provides a comprehensive suite of tools to integrate
                    security best practices directly into your CI/CD pipeline,
                    ensuring continuous compliance and robust protection against
                    vulnerabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Metrics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    Impact & Traction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {keyMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg text-center"
                      >
                        <metric.icon
                          className={`h-10 w-10 mb-3 ${metric.color}`}
                        />
                        <div className="text-3xl font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    Core Platform Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05 + 0.3,
                        }}
                        className="p-6 bg-secondary/50 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-3 h-3 ${feature.iconColor} rounded-full mt-1.5 flex-shrink-0`}
                          ></div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {feature.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recognition Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    Recognition & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recognitions.map((rec, index) => (
                    <motion.div
                      key={rec.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                      className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <Badge
                          className={`mb-1 text-xs px-2 py-0.5 ${rec.badgeColor}`}
                        >
                          {rec.name}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {rec.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </ScrollArea>
        <DialogFooter className="px-6 py-4 border-t border-border bg-background sticky bottom-0 z-20">
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
            onClick={() =>
              window.open("https://ares-security.com/request-demo", "_blank")
            }
          >
            Request a Demo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
