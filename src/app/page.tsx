"use client"

import { useState, useEffect } from 'react'
import { ChevronRight, Star, Rocket, Trophy, Target, BookOpen, CheckCircle, Sparkles, Heart, Zap, Crown, Gift } from 'lucide-react'

export default function FunilRedacaoEnem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userName, setUserName] = useState('')
  const [userDifficulty, setUserDifficulty] = useState('')
  const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '' })
  const [selectedHelps, setSelectedHelps] = useState<string[]>([])
  const [userGoal, setUserGoal] = useState('')
  const [motivation, setMotivation] = useState('')
  const [conquest, setConquest] = useState('')
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [showAnimation, setShowAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const totalSteps = 10
  const progress = (currentStep / totalSteps) * 100

  // Corrigir problema de hidratação
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      setShowAnimation(true)
      const timer = setTimeout(() => setShowAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isClient])

  // Não renderizar até que o cliente esteja pronto
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleDifficultySelect = (difficulty: string) => {
    setUserDifficulty(difficulty)
    setTimeout(nextStep, 500)
  }

  const handleQuizAnswer = (question: 'q1' | 'q2', answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }))
  }

  const toggleHelp = (help: string) => {
    setSelectedHelps(prev => 
      prev.includes(help) 
        ? prev.filter(h => h !== help)
        : [...prev, help]
    )
  }

  const toggleCheckItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const renderProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Etapa {currentStep} de {totalSteps}
          </span>
          <span className="text-sm font-bold text-purple-600">
            {Math.round(progress)}% completo
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )

  // Etapa 1: Boas-vindas
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 relative overflow-hidden">
        {renderProgressBar()}
        
        {/* Animação de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-ping"></div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 transform transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Sua jornada rumo à aprovação começa agora!
            </h1>
            <p className="text-gray-600 text-lg">
              Vamos descobrir como você pode conquistar a nota 1000 na redação do ENEM! ✨
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qual seu nome? 💫
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome aqui..."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg"
              autoComplete="off"
            />
            <button
              onClick={nextStep}
              disabled={!userName.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Vamos começar! <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Etapa 2: Principal dificuldade
  if (currentStep === 2) {
    const difficulties = [
      { id: 'argumentos', text: 'Criar argumentos convincentes', emoji: '💡' },
      { id: 'ideias', text: 'Organizar minhas ideias', emoji: '🧩' },
      { id: 'repertorio', text: 'Falta de repertório sociocultural', emoji: '📚' },
      { id: 'tempo', text: 'Gerenciar o tempo na prova', emoji: '⏰' },
      { id: 'introducao', text: 'Fazer uma introdução impactante', emoji: '✨' }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4 pt-20">
        {renderProgressBar()}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Olá, {userName}! 👋
            </h2>
            <p className="text-gray-600 text-lg">
              Qual é sua principal dificuldade na redação do ENEM?
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => handleDifficultySelect(diff.text)}
                className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl hover:border-purple-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left flex items-center gap-3"
              >
                <span className="text-2xl">{diff.emoji}</span>
                <span className="font-medium text-gray-700">{diff.text}</span>
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ou descreva sua dificuldade:
            </label>
            <textarea
              value={userDifficulty}
              onChange={(e) => setUserDifficulty(e.target.value)}
              placeholder="Conte-nos qual é seu maior desafio..."
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none h-20"
            />
          </div>

          <button
            onClick={nextStep}
            disabled={!userDifficulty.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 3: Mini Quiz
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4 pt-20">
        {renderProgressBar()}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Rápido, {userName}! ⚡
            </h2>
            <p className="text-gray-600">
              Vamos entender melhor seu perfil de estudos
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">
                1. Como você se sente ao escrever redações? 😊
              </h3>
              <div className="space-y-2">
                {['Confiante e motivado', 'Ansioso mas determinado', 'Inseguro e preocupado', 'Perdido e sem direção'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizAnswer('q1', option)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      quizAnswers.q1 === option 
                        ? 'bg-green-100 border-green-400 text-green-800' 
                        : 'bg-gray-50 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">
                2. Quantas horas por semana você dedica à redação? ⏰
              </h3>
              <div className="space-y-2">
                {['Menos de 2 horas', '2-5 horas', '5-10 horas', 'Mais de 10 horas'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizAnswer('q2', option)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      quizAnswers.q2 === option 
                        ? 'bg-green-100 border-green-400 text-green-800' 
                        : 'bg-gray-50 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!quizAnswers.q1 || !quizAnswers.q2}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Próxima pergunta <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 4: Seleção de ajudas
  if (currentStep === 4) {
    const helps = [
      { id: 'modelos', text: 'Modelos de redação prontos', emoji: '📝' },
      { id: 'exemplos', text: 'Exemplos de redações nota 1000', emoji: '🏆' },
      { id: 'dicas', text: 'Dicas práticas e estratégias', emoji: '💡' },
      { id: 'feedback', text: 'Feedback especializado', emoji: '👨‍🏫' },
      { id: 'repertorio', text: 'Banco de repertórios atualizados', emoji: '📚' },
      { id: 'cronograma', text: 'Cronograma de estudos personalizado', emoji: '📅' }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-4 pt-20">
        {renderProgressBar()}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              O que mais te ajudaria, {userName}? ✨
            </h2>
            <p className="text-gray-600">
              Marque tudo que você gostaria de ter (pode escolher várias opções!)
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {helps.map((help) => (
              <button
                key={help.id}
                onClick={() => toggleHelp(help.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                  selectedHelps.includes(help.id)
                    ? 'bg-gradient-to-r from-orange-100 to-pink-100 border-orange-400 text-orange-800 shadow-lg scale-105'
                    : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <span className="text-2xl">{help.emoji}</span>
                <span className="font-medium flex-1">{help.text}</span>
                {selectedHelps.includes(help.id) && (
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={selectedHelps.length === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Vamos em frente! <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 5: Meta/Sonho
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        {renderProgressBar()}
        
        {/* Animação de estrelas */}
        <div className="absolute inset-0">
          <Star className="absolute top-20 left-10 w-8 h-8 text-yellow-300 animate-pulse" />
          <Star className="absolute top-32 right-16 w-6 h-6 text-yellow-200 animate-bounce" />
          <Star className="absolute bottom-40 left-20 w-10 h-10 text-yellow-400 animate-ping" />
          <Rocket className="absolute bottom-20 right-10 w-12 h-12 text-white animate-bounce" />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🌟</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Qual é seu maior sonho, {userName}? 🚀
            </h2>
            <p className="text-gray-600 text-lg">
              Conte-nos o que você quer conquistar ao passar no ENEM!
            </p>
          </div>

          <div className="space-y-4">
            <textarea
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
              placeholder="Ex: Entrar na faculdade dos meus sonhos, fazer Medicina, mudar de vida, realizar o sonho da família..."
              className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none h-32 text-lg"
            />
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
              <p className="text-sm text-purple-700 font-medium">
                💫 Seu sonho é o combustível da sua jornada! Vamos torná-lo realidade juntos.
              </p>
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!userGoal.trim()}
            className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Vamos realizar esse sonho! <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 6: Aquecimento motivacional
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        {renderProgressBar()}
        
        {/* Efeitos de fogo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-red-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-orange-400/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-400/20 rounded-full animate-ping"></div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">🔥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Aquecimento motivacional! 💪
            </h2>
            <p className="text-gray-600 text-lg">
              Em uma palavra, {userName}, o que te motiva a melhorar na redação?
            </p>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Ex: Família, Futuro, Sonhos, Conquista..."
              className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 text-xl text-center font-bold"
              maxLength={20}
            />
            
            {motivation && (
              <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl text-center animate-pulse">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-lg font-bold text-red-700">
                  "{motivation.toUpperCase()}" é sua força interior!
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Essa energia vai te levar longe! 🚀
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-center">
              {['Família', 'Futuro', 'Sonhos', 'Conquista', 'Liberdade', 'Sucesso'].map((word) => (
                <button
                  key={word}
                  onClick={() => setMotivation(word)}
                  className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg hover:from-orange-200 hover:to-red-200 transition-all duration-300 text-sm font-medium"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!motivation.trim()}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Estou motivado! <Zap className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 7: Desafio gamificado
  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        {renderProgressBar()}
        
        {/* Efeitos de conquista */}
        <div className="absolute inset-0">
          <Trophy className="absolute top-16 left-8 w-10 h-10 text-yellow-300 animate-bounce" />
          <Crown className="absolute top-24 right-12 w-8 h-8 text-yellow-400 animate-pulse" />
          <Target className="absolute bottom-32 left-16 w-12 h-12 text-white animate-spin" />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Desafio da Conquista! 🎯
            </h2>
            <p className="text-gray-600 text-lg">
              Complete a frase, {userName}:
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-xl">
              <p className="text-xl font-bold text-emerald-800 text-center mb-4">
                "Com nota máxima na redação vou conquistar..."
              </p>
              <textarea
                value={conquest}
                onChange={(e) => setConquest(e.target.value)}
                placeholder="Ex: minha vaga na universidade dos sonhos, a aprovação que minha família espera, meu futuro brilhante..."
                className="w-full px-4 py-4 border-2 border-emerald-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300 resize-none h-24 text-lg"
              />
            </div>
            
            {conquest && (
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl text-center animate-pulse">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-sm font-bold text-orange-700">
                  Essa conquista está mais perto do que você imagina! 🚀
                </p>
              </div>
            )}
          </div>

          <button
            onClick={nextStep}
            disabled={!conquest.trim()}
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Vou conquistar isso! <Trophy className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 8: Depoimentos
  if (currentStep === 8) {
    const testimonials = [
      {
        name: "Ana Clara",
        score: "980",
        text: "Saí de 600 para 980 na redação! O método realmente funciona! 🎉",
        emoji: "👩‍🎓"
      },
      {
        name: "João Pedro",
        score: "1000",
        text: "NOTA 1000! Não acreditei quando vi o resultado. Valeu cada minuto! ⭐",
        emoji: "👨‍🎓"
      },
      {
        name: "Maria Eduarda",
        score: "940",
        text: "Finalmente entendi como fazer uma redação nota máxima. Aprovada em Medicina! 💊",
        emoji: "👩‍⚕️"
      }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 flex items-center justify-center p-4 pt-20">
        {renderProgressBar()}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Veja quem já conquistou! 🏆
            </h2>
            <p className="text-gray-600">
              Estudantes como você que transformaram suas redações:
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border-2 border-violet-200 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{testimonial.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-violet-800">{testimonial.name}</h4>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {testimonial.score} pontos
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{testimonial.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-100 to-purple-100 p-4 rounded-xl text-center mb-6">
            <p className="text-violet-700 font-bold">
              🎯 Sua vez está chegando, {userName}! 
            </p>
            <p className="text-violet-600 text-sm mt-1">
              Você também pode estar aqui em breve! ✨
            </p>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Quero meu resultado! <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 9: Checklist
  if (currentStep === 9) {
    const checklistItems = [
      { id: 'argumentos', text: 'Treinou criação de argumentos', emoji: '💡' },
      { id: 'modelos', text: 'Estudou modelos de redação', emoji: '📝' },
      { id: 'repertorio', text: 'Revisou repertórios socioculturais', emoji: '📚' },
      { id: 'estrutura', text: 'Dominou a estrutura dissertativa', emoji: '🏗️' },
      { id: 'tempo', text: 'Praticou gestão de tempo', emoji: '⏰' },
      { id: 'revisao', text: 'Aprendeu técnicas de revisão', emoji: '✅' }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center p-4 pt-20">
        {renderProgressBar()}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Checklist de Preparação 📝
            </h2>
            <p className="text-gray-600">
              {userName}, marque o que você já fez na sua preparação:
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {checklistItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheckItem(item.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                  checkedItems.includes(item.id)
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400 text-green-800 shadow-lg'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-medium flex-1">{item.text}</span>
                {checkedItems.includes(item.id) ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl text-center mb-6">
            <p className="text-blue-700 font-bold">
              ✅ {checkedItems.length} de {checklistItems.length} itens completos
            </p>
            <p className="text-blue-600 text-sm mt-1">
              {checkedItems.length < 3 
                ? "Você precisa de mais preparação! Vamos te ajudar! 🚀"
                : "Ótimo progresso! Você está no caminho certo! 🌟"
              }
            </p>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar jornada <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 10: Oferta especial (antiga etapa 10, agora é a final)
  if (currentStep === 10) {
    const benefits = [
      "📝 Modelos de redação nota 1000",
      "💡 Estratégias de argumentação",
      "📚 Banco de repertórios atualizados",
      "⏰ Técnicas de gestão de tempo",
      "✅ Checklist de revisão completo",
      "🎯 Método passo a passo"
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        {renderProgressBar()}
        
        {/* Efeitos de oferta */}
        <div className="absolute inset-0">
          <Gift className="absolute top-20 left-8 w-12 h-12 text-yellow-300 animate-bounce" />
          <Trophy className="absolute top-32 right-12 w-10 h-10 text-yellow-400 animate-pulse" />
          <Crown className="absolute bottom-40 left-12 w-14 h-14 text-yellow-200 animate-spin" />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oferta Especial para Você! 🔥
            </h2>
            <p className="text-gray-600">
              {userName}, chegou a hora de transformar sua redação!
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-red-800 text-center mb-4">
              🏆 GUIA COMPLETO REDAÇÃO ENEM 1000
            </h3>
            
            <div className="space-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="text-gray-500 line-through text-lg">De R$ 97,00</div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                R$ 29,90
              </div>
              <a 
                href="https://pay.kirvano.com/f3e14b37-66e1-4da3-b0a9-93f05d23114f"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block transition-colors duration-300"
              >
                🔥 OFERTA LIMITADA 🔥
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl mb-6 text-center">
            <p className="text-orange-700 font-bold text-sm">
              ⚡ Mais de 10.000 estudantes já conquistaram suas aprovações!
            </p>
            <p className="text-orange-600 text-xs mt-1">
              Seja o próximo a realizar seu sonho! 🌟
            </p>
          </div>

          <a
            href="https://pay.kirvano.com/f3e14b37-66e1-4da3-b0a9-93f05d23114f"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse"
          >
            QUERO MINHA NOTA 1000! <Trophy className="w-5 h-5" />
          </a>

          <p className="text-center text-xs text-gray-500 mt-3">
            🔒 Pagamento 100% seguro • Acesso imediato
          </p>

          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-green-100 p-4 rounded-xl text-center">
            <p className="text-green-700 font-bold text-sm">
              🎯 {userName}, sua aprovação está a um clique de distância!
            </p>
            <p className="text-green-600 text-xs mt-1">
              Junte-se aos milhares que já conquistaram suas vagas! 🌟
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}